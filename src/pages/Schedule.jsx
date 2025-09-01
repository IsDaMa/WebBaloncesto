// src/pages/Schedule.jsx
import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../estilos/calendario.css";

const Schedule = () => {
  const [equipos, setEquipos] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Cargar equipos
  useEffect(() => {
    const fetchEquipos = async () => {
      const { data, error } = await supabase.from("equipos").select("id, nombre");
      if (error) {
        console.error("Error fetching equipos:", error);
      } else {
        setEquipos(data);
      }
    };
    fetchEquipos();
  }, []);

  // 🚀 Cargar calendario
useEffect(() => {
  const fetchSchedule = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("calendario")
      .select("*")
      .order("dia", { ascending: true });

    if (error) {
      console.error("❌ Error fetching calendario:", error);
    } else {
      console.log("📅 Datos calendario recibidos:", data); // 👈 DEBUG
      setPartidos(data);
    }
    setLoading(false);
  };

  fetchSchedule();
}, []);

  // 🔎 Filtrar por equipo
  const partidosFiltrados = useMemo(() => {
    if (!activeTeam) return partidos;
    return partidos.filter((p) => p.equipo_id === activeTeam);
  }, [activeTeam, partidos]);

  // 📌 Función para obtener nombre de equipo
  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find((e) => e.id === equipoId);
    return equipo ? equipo.nombre : "Equipo no asignado";
  };

  if (loading) return <p className="text-center py-8">Cargando calendario...</p>;

  return (
    <div className="clasificacion-container">
      <div className="clasificacion-header">
        <h1>📅 Calendario de Partidos</h1>
        <div className="clasificacion-divider"></div>
        <p>Aquí encontrarás los próximos partidos del club.</p>
      </div>

      {/* Tabs de equipos */}
      <div className="team-tabs">
        <button
          onClick={() => setActiveTeam(null)}
          className={`team-tab ${activeTeam === null ? "active" : ""}`}
        >
          Todos
        </button>
        {equipos.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTeam(team.id)}
            className={`team-tab ${activeTeam === team.id ? "active" : ""}`}
          >
            {team.nombre}
          </button>
        ))}
      </div>

      {/* Tabla */}
      {partidosFiltrados.length === 0 ? (
        <p className="clasificacion-empty">No hay partidos programados.</p>
      ) : (
        <table className="clasificacion-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora</th>
              <th>Equipo</th>
              <th>Rival</th>
              <th>Lugar</th>
            </tr>
          </thead>
          <tbody>
            {partidosFiltrados.map((partido) => (
              <tr key={partido.id}>
                <td>
                  {partido.dia
                    ? new Date(partido.dia).toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    : "Por definir"}
                </td>
                <td>{partido.hora ? partido.hora.slice(0, 5) : "Por definir"}</td>
                <td>{getEquipoNombre(partido.equipo_id)}</td>
                <td>{partido.rival || "Por definir"}</td>
                <td>{partido.lugar || "Por definir"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Schedule;
