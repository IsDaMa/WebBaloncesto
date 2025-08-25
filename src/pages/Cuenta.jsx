import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cuenta = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signIn, signUp, signOut, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    setError('');
    const { email, password, confirmPassword, name } = formData;

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Por favor ingresa un email válido');
      return false;
    }
    
    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }
      if (!name || name.trim().length < 3) {
        setError('El nombre debe tener al menos 3 caracteres');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn({
          email: formData.email,
          password: formData.password
        });
        
        if (error) throw error;
        
        setSuccess('Inicio de sesión exitoso');
        setTimeout(() => navigate('/perfil'), 1500);
      } else {
        const { error } = await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
        
        if (error) throw error;
        
        setSuccess('Registro exitoso. Por favor verifica tu email.');
        setIsLogin(true);
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Por favor ingresa un email válido para recuperar tu contraseña');
      return;
    }

    try {
      const { error } = await resetPassword(formData.email);
      
      if (error) throw error;
      
      setSuccess(`Se ha enviado un enlace de recuperación a ${formData.email}`);
      setError('');
    } catch (err) {
      setError(err.message || 'Error al enviar el enlace de recuperación');
      setSuccess('');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-deepGreen text-white py-4 px-6">
              <h2 className="text-2xl font-bold text-center">Mi Cuenta</h2>
            </div>
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-deepGreen mb-2">¡Bienvenido, {user.name}!</h3>
              <p className="text-gray-600 mb-6">{user.email}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/perfil')}
                  className="flex-1 bg-gold hover:bg-amber-500 text-white py-2 px-4 rounded font-medium transition-colors"
                >
                  Mi Perfil
                </button>
                <button
                  onClick={signOut}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-deepGreen py-2 px-4 rounded font-medium transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-deepGreen text-white py-4 px-6">
            <h2 className="text-2xl font-bold text-center">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </h2>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Tu nombre"
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>
              {!isLogin && (
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="••••••••"
                    minLength="6"
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-deepGreen hover:bg-[#0A3A1D] text-white py-2 px-4 rounded font-medium transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </button>
            </form>

            <div className="mt-4 text-center space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-sm text-gold hover:text-amber-500 transition-colors"
              >
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
              </button>

              {isLogin && (
                <button
                  onClick={handlePasswordReset}
                  className="block text-sm text-gold hover:text-amber-500 transition-colors mx-auto"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuenta;