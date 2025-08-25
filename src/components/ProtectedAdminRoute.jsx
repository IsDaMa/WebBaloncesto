// components/ProtectedAdminRoute.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedAdminRoute({ children }) {
  const { user, loading, checkAdminAccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      if (loading) return;

      if (!user) {
        navigate('/login', {
          state: { from: location },
          replace: true,
        });
        return;
      }

      const isAdmin = await checkAdminAccess();
      if (!isAdmin) {
        navigate('/', { replace: true });
        return;
      }

      setAccessGranted(true);
    };

    verifyAccess();
  }, [user, loading]);

  if (loading || !accessGranted) {
    return <LoadingSpinner fullScreen />;
  }

  return children;
}
