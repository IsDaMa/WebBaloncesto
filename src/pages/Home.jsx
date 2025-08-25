import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{
        backgroundImage: "linear-gradient(to bottom, rgba(12, 69, 33, 0.7), rgba(12, 69, 33, 0.7)), url('/assets/images/hero-bg.jpg')"
      }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          {/* Logo del club agregado aquí */}
          <div className="mb-4 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
            <img
              src="/assets/images/logo.png"
              alt="Logo CB Cártama"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">CB Cártama</h1>
          <p className="text-xl md:text-2xl text-white mb-8">Pasión por el baloncesto desde 2006</p>
          <a href="#about" className="bg-gold hover:bg-amber-500 text-white py-3 px-6 rounded-full text-lg font-medium transition-colors">
            Conoce más
          </a>
        </div>
      </section>

      {/* Resto del código permanece igual */}
      {/* Announcement Banner */}
      <div className="bg-gold text-deepGreen py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="font-medium">
            ¡Próximo partido! CB Cártama vs CD Estrellas - Domingo, 15 de Julio a las 18:00
          </p>
        </div>
      </div>

      {/* Club Info Section */}
      <section id="about" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deepGreen mb-4">Nuestro Club</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Desde su fundación en 2006, CB Cártama se ha convertido en uno de los clubes de baloncesto más
              destacados en Málaga. Nuestra misión es promover el baloncesto como herramienta educativa y de
              desarrollo personal para jugadores de todas las edades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deepGreen mb-2">Equipo profesional</h3>
              <p className="text-gray-600">
                Nuestro equipo senior compite al más alto nivel en la Liga Nacional, con jugadores dedicados y talentosos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deepGreen mb-2">Formación de cantera</h3>
              <p className="text-gray-600">
                Contamos con equipos en todas las categorías para formar a los jugadores del futuro.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deepGreen mb-2">Instalaciones</h3>
              <p className="text-gray-600">
                Modernas instalaciones para entrenamientos y partidos con todo lo necesario para el desarrollo deportivo.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Highlights Section - Próximamente */}
<section className="py-12 md:py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-deepGreen mb-4">Últimos Resultados</h2>
      <h2 className="text-3xl md:text-4xl font-bold text-deepGreen mb-4">📅 Próximamente</h2>
      <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Consulta aquí los partidos y eventos que están por venir.
      </p>
    </div>
    </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deepGreen mb-6">¿Quieres formar parte de nuestro club?</h2>
          <p className="text-xl text-deepGreen mb-8 max-w-3xl mx-auto">
            Ya seas jugador, entrenador o aficionado, hay un lugar para ti en CB Cártama. ¡Únete a nuestra familia!
          </p>
          <a href="/contact" className="inline-block bg-deepGreen hover:bg-[#0A3A1D] text-white py-3 px-8 rounded-full text-lg font-bold transition-colors">
            Contacta con nosotros
          </a>
        </div>
      </section>
      {/* Sección Patrocinadores */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deepGreen mb-4">🎥 Patrocinadores</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Descubre quiénes apoyan a nuestro club y hacen posible nuestra pasión por el baloncesto.
          </p>

          <div className="max-w-4xl mx-auto">
            <video
              className="w-full rounded-lg shadow-md"
              controls
              autoPlay
              muted
              loop
            >
              <source src="/assets/video/patrocinadores.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;