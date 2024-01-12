import axios from 'axios'
//Base da URL:https://api.themoviedb.org/3/
//url da api: /movie/now_playing?api_key=06767c8fbfc66395fa28c94b903a6a6f&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

export default api;