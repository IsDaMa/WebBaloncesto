import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Bienvenido, {user?.email}</p>
      </div>
    </div>
  );
}