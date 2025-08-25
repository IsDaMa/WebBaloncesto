import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // ✅ Importa el provider
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ⬅️ Coloca el provider aquí */}
      <App />
    </AuthProvider>
  </StrictMode>
);
