import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Schedule from './pages/Schedule';
import News from './pages/News';
import Contact from './pages/Contact';
import Cuenta from './pages/Cuenta';
import Perfil from './pages/Perfil';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorPage from './pages/Error';
import NoticiaDetalle from "./pages/NoticiaDetalle";
import Clasificacion from "./pages/Clasificacion";

function AppWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className={`flex-grow pb-8 ${isMenuOpen ? 'pt-[320px]' : 'pt-16'} md:pt-20 transition-all duration-300`}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/noticia/:id" element={<NoticiaDetalle />} />

          {/* Rutas protegidas para usuarios autenticados */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clasificacion"
            element={
              <ProtectedRoute>
                <Clasificacion />
              </ProtectedRoute>
            }
          />
          {/* Redirección para rutas desconocidas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}