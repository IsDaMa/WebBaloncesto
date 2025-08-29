import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../estilos/clasificacion.css";

const Clasificacion = () => {
  const [equipos, setEquipos] = useState([]);
  const [activeEquipo, setActiveEquipo] = useState(null);
  const [clasificacion, setClasificacion] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Traer categorías
  useEffect(() => {
    const fetchEquipos = async () => {
      const { data, error } = await supabase
        .from("equipos")
        .select("id, nombre");

      if (error) {
        console.error("Error fetching equipos:", error);
        return;
      }
console.log (data[0].id);
      setEquipos(data);
      if (data.length > 0) {
        setActiveEquipo(data[0].id); // 👈 Seleccionamos la primera por defecto
      }
      setLoading(false);
    };

    fetchEquipos();
  }, []);

  // 🚀 Traer clasificación de la categoría activa
  useEffect(() => {
    const fetchClasificacion = async () => {
      if (!activeEquipo) return;

      const { data, error } = await supabase
        .from("vista_clasificaciones")
        .select("*")
        .eq("categoria_id", activeEquipo) // 👈 filtramos por categoría
        .order("puntos", { ascending: false }); // 👈 ordenamos por puntos

      if (error) {
        console.error("Error fetching clasificacion:", error);
        return;
      }

      setClasificacion(data);
    };

    fetchClasificacion();
  }, [activeEquipo]);

  if (loading) return <p className="text-center py-8">Cargando categorías...</p>;

  return (
    <div className="clasificacion-container">
      <div className="clasificacion-header">
        <h1>Clasificación</h1>
        <div className="clasificacion-divider"></div>
        <p>Selecciona una categoría para ver su clasificación.</p>
      </div>

      {/* Tabs de categorías */}
      <div className="clasificacion-tabs">
        {equipos.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setActiveEquipo(categoria.id)}
            aria-pressed={activeEquipo === categoria.id}
            className={`clasificacion-tab ${activeEquipo === categoria.id ? "active" : ""}`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

{/* 📊 Tabla de Clasificación */}
<div className="clasificacion-container">
  {clasificacion.length === 0 ? (
    <p className="clasificacion-empty">No hay datos de clasificación para esta categoría.</p>
  ) : (
    <table className="clasificacion-table">
      <thead>
        <tr>
          <th>Equipo</th>
          <th>Partidos</th>
          <th>Victorias</th>
          <th>Derrotas</th>
          <th>P. Favor</th>
          <th>P. Contra</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        {clasificacion.map((row, index) => (
          <tr key={index}>
            <td>{row.equipo_id}</td>
            <td>{row.partidos_jugados}</td>
            <td>{row.victorias}</td>
            <td>{row.derrotas}</td>
            <td>{row.puntos_favor}</td>
            <td>{row.puntos_contra}</td>
            <td className="font-bold">{row.puntos}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </div>
  );
};

export default Clasificacion;
