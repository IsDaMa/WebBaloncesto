import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, fallback = null, redirectTo = "/cuenta" }) => {
  const { user, profile, loading } = useAuth();

  // 🚦 Si aún se está verificando sesión → mostrar loader
  if (loading) {
    console.log("⏳ ProtectedRoute: esperando sesión...");
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">Cargando...</div>
    );
  }

  // 🔒 Si no hay usuario → redirigir
  if (!user) {
    console.warn("🔒 ProtectedRoute: usuario no autenticado, redirigiendo a", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  // 👤 Si necesitas perfil y no existe → redirigir o manejar fallback
  if (!profile) {
    console.warn("⚠️ ProtectedRoute: usuario sin perfil cargado, redirigiendo...");
    return <Navigate to={redirectTo} replace />;
  }

  console.log("✅ ProtectedRoute: acceso concedido");
  return children;
};

export default ProtectedRoute;
