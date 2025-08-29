import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../estilos/teams.css"; // 👈 Importamos el CSS separado

const Team = () => {
  const [activeTeam, setActiveTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Traer equipos
  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase.from("equipos").select("*");
      if (error) {
        console.error("Error fetching teams:", error);
        return;
      }
      setTeams(data);
      if (data.length > 0) {
        setActiveTeam(data[0].id);
      }
    };
    fetchTeams();
  }, []);

  // 🚀 Traer jugadores
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("jugadores").select("*");
      if (error) {
        console.error("Error fetching players:", error);
      } else {
        setPlayers(data);
      }
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  // 🔎 Filtrar jugadores por equipo
  const filteredPlayers = useMemo(() => {
    if (!activeTeam) return [];
    return players.filter((player) => player.equipo_id === activeTeam);
  }, [activeTeam, players]);

  if (loading) return <p className="text-center py-8">Cargando datos...</p>;

  return (
    <div className="team-container">
      <div className="team-header">
        <h1>Nuestro Equipo</h1>
        <div className="team-divider"></div>
        <p>
          Conoce a los jugadores y al cuerpo técnico que forman parte de CB
          Cártama. Un gran equipo de profesionales comprometidos con el
          baloncesto.
        </p>
      </div>

      {/* Tabs de equipos */}
      <div className="team-tabs">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTeam(team.id)}
            aria-pressed={activeTeam === team.id}
            className={`team-tab ${activeTeam === team.id ? "active" : ""}`}
          >
            {team.nombre}
          </button>
        ))}
      </div>

      {/* Cards de jugadores */}
      <div className="team-grid">
        {filteredPlayers.length === 0 ? (
          <p className="team-empty">No hay jugadores en este equipo.</p>
        ) : (
          filteredPlayers.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-image">
                <img
                  src={player.avatar_url || "/default-player.png"}
                  alt={player.nombre}
                />
                <div className="player-overlay">
                  {player.dorsal && (
                    <span className="player-number">#{player.dorsal}</span>
                  )}
                  <span className="player-name">{player.nombre}</span>
                </div>
              </div>
              <div className="player-stats">
                <p>🏀 Puntos 2: {player.puntos_dos}</p>
                <p>🎯 Puntos 3: {player.puntos_tres}</p>
                <p>✅ Tiros libres: {player.tiros_libres}</p>
                <p>⏱️ Minutos: {player.minutos}</p>
                <p>🚨 Personales: {player.personales}</p>
                <p>📦 Rebotes: {player.rebotes}</p>
                <p>🛡️ Robos: {player.robos}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Team;
