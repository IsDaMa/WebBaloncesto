import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, fallback = null, redirectTo = "/cuenta" }) => {
  const { user, profile, loading } = useAuth();

  if (loading || !profile) {
    console.log("⏳ ProtectedRoute: esperando... loading:", loading, "profile:", profile);
    return fallback || <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!user) {
    console.warn("🔒 ProtectedRoute: usuario no autenticado, redirigiendo a", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  console.log("✅ ProtectedRoute: acceso concedido");
  return children;
};

export default ProtectedRoute;
