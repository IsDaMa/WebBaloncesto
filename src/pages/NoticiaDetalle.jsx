import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import "../estilos/noticiaDetalle.css";

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setNoticia(data);
      } else {
        console.error("Error cargando noticia:", error);
      }
    };

    fetchNoticia();
  }, [id]);

  if (!noticia)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Cargando noticia...
      </p>
    );

  return (
    <div className="noticia-detalle">
      <div className="noticia-detalle-inner">
        
        {/* Botón volver arriba */}
        <Link to="/news" className="noticia-volver">
          ← Volver a noticias
        </Link>

        <h1>{noticia.titulo}</h1>
        <p className="noticia-meta">
          {new Date(noticia.fecha).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          • {noticia.autor}
        </p>
        
        <img
          src={noticia.imagen_url || "https://placehold.co/800x400"}
          alt={noticia.titulo}
        />
        
        <p>{noticia.contenido}</p>

        {/* Botón volver abajo */}
        <Link to="/news" className="noticia-volver">
          ← Volver a noticias
        </Link>
      </div>
    </div>
  );
}
