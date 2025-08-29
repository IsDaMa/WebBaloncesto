import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Configuración mejorada del cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // Permite control manual
    autoRefreshToken: false,   // Evita renovaciones automáticas
    detectSessionInUrl: false  // Previene problemas con OAuth
  }
});

// Solo para desarrollo: expone supabase en el ámbito global
if (import.meta.env.DEV) {
  window.supabase = supabase;
}

export default supabase;