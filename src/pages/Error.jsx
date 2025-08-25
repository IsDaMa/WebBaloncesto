// src/pages/Error.jsx
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">¡Oops!</h1>
        <p className="mb-2">Lo sentimos, ha ocurrido un error inesperado.</p>
        <p className="text-gray-500">
          {error.statusText || error.message}
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Volver al inicio
        </button>
      </main>
      <Footer />
    </div>
  );
}