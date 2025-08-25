import { supabase } from '../supabase/supabaseClient';

export const AuthService = {
  async signUp({ email, password, name }) {
    try {
      // 1. Registro en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
          }
        }
      });

      if (authError) throw authError;

      // 2. Crear perfil en la tabla 'profiles'
      const user = authData.user;
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            user_id: user.id,
            name,
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
            email,
            updated_at: new Date().toISOString()
          });

        if (profileError) throw profileError;
      }

      return { user, error: null };
    } catch (error) {
      console.error('Error en signUp:', error);
      return { user: null, error };
    }
  },

  async signIn({ email, password }) {
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // Obtener perfil adicional
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (profileError) throw profileError;

      return {
        user: {
          ...data.user,
          profile
        },
        error: null
      };
    } catch (error) {
      console.error('Error en signIn:', error);
      return { user: null, error };
    }
  },

  async signOut() {
    try {
      // Limpiar almacenamiento local primero
      localStorage.removeItem('sb-connect-token');
      sessionStorage.removeItem('sb-connect-token');
      
      const { error } = await supabase.auth.signOut();
      return { error: error || null };
    } catch (error) {
      console.error('Error en signOut:', error);
      return { error };
    }
  },

  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      return { error: error || null };
    } catch (error) {
      return { error };
    }
  },

  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { session: data?.session, error: error || null };
    } catch (error) {
      return { session: null, error };
    }
  }
};