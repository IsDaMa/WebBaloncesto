import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }
  };

  const updateAuthState = async (user) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      if (user) {
        const profile = await fetchUserProfile(user.id);
        setAuthState({
          user,
          profile,
          loading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          profile: null,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        profile: null,
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (isMounted) {
        await updateAuthState(session?.user || null);
      }
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await updateAuthState(session?.user || null);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const profile = await fetchUserProfile(data.user.id);
      setAuthState({
        user: data.user,
        profile,
        loading: false,
        error: null,
      });
      return { success: true, isAdmin: profile?.is_admin };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error };
    }
  };

  // 🔑 Registro de usuario con upsert para evitar conflictos
  const signUp = async ({ email, password, name }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw error;

      // 🔄 Upsert en la tabla "profiles"
      if (data.user) {
        await supabase.from('profiles').upsert({
          user_id: data.user.id,
          name,
          is_admin: false,
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuthState({
      user: null,
      profile: null,
      loading: false,
      error: null,
    });
  };

  const checkAdminAccess = async () => {
    if (!authState.user) return false;
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('user_id', authState.user.id)
      .single();
    if (error) {
      console.error('Error verificando acceso admin:', error);
      return false;
    }
    return data?.is_admin === true;
  };

  const value = {
    ...authState,
    isAdmin: authState.profile?.is_admin === true,
    signIn,
    signUp,
    signOut,
    checkAdminAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {authState.loading ? <LoadingSpinner fullScreen /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
