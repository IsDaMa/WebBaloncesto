import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Perfil = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-deepGreen mb-4">Acceso no autorizado</h2>
          <Link
            to="/cuenta"
            className="bg-gold hover:bg-amber-500 text-white py-2 px-6 rounded-full font-medium transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-deepGreen text-white py-6 px-8">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-lightGray">{user.email}</p>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="w-32 h-32 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white"
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
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-deepGreen mb-2">{user.name}</h2>
                  <p className="text-gray-600 mb-4">Socio del CB Cártama</p>
                  <button
                    onClick={logout}
                    className="bg-gray-200 hover:bg-gray-300 text-deepGreen py-2 px-6 rounded-full font-medium transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-deepGreen mb-4">Información de la cuenta</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Correo electrónico</label>
                      <p className="mt-1 text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Tipo de cuenta</label>
                      <p className="mt-1 text-gray-900">Socio estándar</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Fecha de registro</label>
                      <p className="mt-1 text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-deepGreen mb-4">Preferencias</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                        Recibir newsletter
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="notifications"
                        name="notifications"
                        type="checkbox"
                        className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                      />
                      <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                        Recibir notificaciones
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;