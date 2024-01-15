import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme.css";
import { toast } from "react-toastify";

import api from "../../services/api";
function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "06767c8fbfc66395fa28c94b903a6a6f",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("Componente desmontado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmeSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmeSalvos.some(
      (filmesSalvos) => filmesSalvos.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme ja foi salvo em sua lista!");
      return;
    }

    filmeSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview} </span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-button">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`http://youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
