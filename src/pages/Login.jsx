// pages/Login.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    location.state?.from?.pathname ||
    new URLSearchParams(location.search).get('redirect') ||
    (isAdmin ? '/admin' : '/');

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const res = await signIn({
      email: email.value,
      password: password.value,
    });

    if (res.success) {
      navigate(res.isAdmin ? '/admin' : '/', { replace: true });
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
