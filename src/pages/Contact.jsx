import React, { useState } from "react";
import { Mail, PhoneCall, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>

      {/* Datos de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex items-start space-x-4">
          <Mail className="text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>contacto@clubbaloncesto.com</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <PhoneCall className="text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold">Teléfono</h3>
            <p>+34 123 456 789</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <MapPin className="text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold">Dirección</h3>
            <p>Calle Falsa 123, Ciudad Deportiva</p>
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="flex space-x-6 mb-10">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="text-blue-700 hover:text-blue-900" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="text-pink-600 hover:text-pink-800" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin className="text-blue-500 hover:text-blue-700" />
        </a>
      </div>

      {/* Formulario de contacto */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-12">
        <p className="text-lg mb-4">
          ¿Quieres formar parte de nuestro club?<br />
          Ya seas jugador, entrenador o aficionado, hay un lugar para ti en CB Cártama. <strong>¡Únete a nuestra familia!</strong>
        </p>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Mensaje"
          className="w-full p-2 border rounded"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Contacta con nosotros
        </button>
      </form>
    </div>
  );
};

export default Contact;
