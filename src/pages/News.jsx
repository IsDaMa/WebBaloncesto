import React, { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import "../estilos/news.css";
import { Link } from "react-router-dom";

const News = () => {
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("all");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const noticiasPorPagina = 6;

  // Cargar categorías dinámicamente desde la tabla
  useEffect(() => {
    const fetchCategorias = async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("categoria")
        .not("categoria", "is", null);

      if (error) {
        console.error("Error cargando categorías:", error);
      } else {
        const uniqueCategories = [
          ...new Set(data.map((item) => item.categoria)),
        ];
        setCategorias(uniqueCategories);
      }
    };

    fetchCategorias();
  }, []);

  // Cargar noticias
  useEffect(() => {
    const fetchNoticias = async () => {
      let query = supabase
        .from("noticias")
        .select("*", { count: "exact" })
        .order("fecha", { ascending: false })
        .range((pagina - 1) * noticiasPorPagina, pagina * noticiasPorPagina - 1);

      if (filtro !== "all") {
        query = query.eq("categoria", filtro);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error("Error cargando noticias:", error);
      } else {
        setNoticias(data || []);
        if (count) {
          setTotalPaginas(Math.ceil(count / noticiasPorPagina));
        }
      }
    };

    fetchNoticias();
  }, [pagina, filtro]);

  return (
    <div className="news-container">
      <div className="news-inner">
        {/* Encabezado */}
        <div className="news-header">
          <h1>Noticias</h1>
          <div className="news-divider"></div>
          <p>
            Mantente al día con las últimas noticias, resultados y eventos del
            CB Cártama.
          </p>
        </div>

        {/* Tabs de categorías */}
        <div className="news-tabs">
          <button
            className={`news-tab ${filtro === "all" ? "active" : ""}`}
            onClick={() => {
              setFiltro("all");
              setPagina(1);
            }}
          >
            Todas
          </button>
          {categorias.map((categoria, i) => (
            <button
              key={i}
              className={`news-tab ${filtro === categoria ? "active" : ""}`}
              onClick={() => {
                setFiltro(categoria);
                setPagina(1);
              }}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de noticias */}
        <div className="news-grid">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="news-card">
              {/* Imagen con fallback */}
              <div className="news-image">
                <img
                  src={noticia.imagen_url || "https://placehold.co/600x400"}
                  alt={noticia.titulo}
                />
                {noticia.categoria && (
                  <div className="news-category">{noticia.categoria}</div>
                )}
              </div>

              {/* Contenido */}
              <div className="news-content">
                <div className="news-date">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(noticia.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="news-title">{noticia.titulo}</h3>
                <p className="news-summary">
                  {noticia.contenido.length > 120
                    ? noticia.contenido.substring(0, 120) + "..."
                    : noticia.contenido}
                </p>
                <Link to={`/noticia/${noticia.id}`} className="news-readmore">
                  Leer más →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="news-pagination">
          <nav>
            <button
              className="page-btn prev"
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
            >
              ◀
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${pagina === i + 1 ? "active" : ""}`}
                onClick={() => setPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn next"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              ▶
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default News;
