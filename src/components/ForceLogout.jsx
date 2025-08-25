import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

export default function ForceLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const forceLogout = async () => {
      await supabase.auth.signOut();
      localStorage.clear();
      window.location.href = '/login';
    };
    
    forceLogout();
  }, [navigate]);

  return <div>Cerrando sesión forzadamente...</div>;
}