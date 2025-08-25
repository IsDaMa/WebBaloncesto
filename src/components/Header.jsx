import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdEmail,
  MdCall,
  MdPerson,
  MdLogout,
  MdHome,
  MdEvent,
  MdGroup,
  MdArticle,
  MdContactMail
} from 'react-icons/md';

const Header = ({ isMenuOpen, toggleMenu }) => {
  const { user, signOut: logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Inicio', icon: <MdHome /> },
    ...(user
      ? [
          { path: '/team', label: 'Equipo', icon: <MdGroup /> },
          { path: '/schedule', label: 'Calendario', icon: <MdEvent /> },
          { path: '/perfil', label: 'Perfil', icon: <MdPerson /> }
        ]
      : []),
    { path: '/news', label: 'Noticias', icon: <MdArticle /> },
    { path: '/contact', label: 'Contacto', icon: <MdContactMail /> },
    ...(!user ? [{ path: '/cuenta', label: 'Cuenta', icon: <MdPerson /> }] : [])
  ];

  const contactInfo = [
    {
      type: 'tel',
      value: '+34 912 345 678',
      icon: <MdCall className="text-gold mr-2 group-hover:text-amber-200 transition-colors" />
    },
    {
      type: 'email',
      value: 'contacto@cbcartama.es',
      icon: <MdEmail className="text-gold mr-2 group-hover:text-amber-200 transition-colors" />
    }
  ];

  const renderNavItem = (path, label, icon = null, mobile = false, isButton = false) => {
    const baseClasses = mobile
      ? 'flex items-center px-4 py-3 font-medium rounded-lg transition-colors duration-200'
      : 'px-4 py-2 font-medium transition-colors duration-200 flex items-center';

    if (isButton) {
      return (
        <button
          key={label}
          className={`${baseClasses} text-white hover:text-gold hover:bg-white/5 w-full text-left`}
          onClick={mobile ? () => { logout(); toggleMenu(); } : logout}
        >
          {icon && <span className="mr-2 text-lg">{icon}</span>}
          {label}
        </button>
      );
    }

    return (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          isActive
            ? `${baseClasses} text-gold bg-white/10`
            : `${baseClasses} text-white hover:text-gold hover:bg-white/5`
        }
        onClick={mobile ? toggleMenu : undefined}
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
      >
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        {label}
      </NavLink>
    );
  };

  return (
    <header className="bg-deepGreen shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deepGreen rounded transition-all"
              aria-label="Ir a inicio"
            >
              <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center mr-3">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo CB Cártama"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-lg md:text-xl text-white">CB Cártama</span>
                <span className="hidden md:block text-xs text-lightGray">Club Baloncesto Cártama</span>
              </div>
            </Link>
          </div>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex space-x-1 items-center" aria-label="Navegación principal">
            {navItems.map(({ path, label, icon }) => renderNavItem(path, label, icon))}
            {user && renderNavItem(null, 'Cerrar sesión', <MdLogout />, false, true)}
          </nav>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deepGreen text-white hover:text-gold transition-colors"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navegación móvil */}
      <nav
        id="mobile-menu"
        className={`md:hidden fixed w-full bg-deepGreen shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-50 ${isMenuOpen ? 'max-h-screen py-2' : 'max-h-0 py-0'}`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col px-4 py-2 space-y-1">
          {navItems.map(({ path, label, icon }) => (
            <li key={path}>{renderNavItem(path, label, icon, true)}</li>
          ))}
          {user && (
            <li>
              {renderNavItem(null, 'Cerrar sesión', <MdLogout />, true, true)}
            </li>
          )}
        </ul>

        <div className="bg-[#0A3A1D] px-4 py-3 mt-2 border-t border-sage/30">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={`${info.type === 'tel' ? 'tel:' : 'mailto:'}${info.value}`}
              className="flex items-center mb-3 text-sm text-white hover:text-gold last:mb-0 group transition-colors"
            >
              {info.icon}
              {info.value}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
