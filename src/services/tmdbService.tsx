import axios from '../axios/index';

const moviePath = '/3/movie/';
const seriesPath = '/3/tv/';

async function buscaFilmesPorCategoria(categoria: string) {
  try {
    const { data } = await axios.get(moviePath + categoria + '?language=pt-BR&page=1');
    return data;
  } catch (err) {
    throw new Error('error');
  }
}

async function buscaSeriesPorCategoria(categoria: string) {
  try {
    const { data } = await axios.get(seriesPath + categoria + '?language=pt-BR&page=1');
    return data;
  } catch (err) {
    throw new Error('Não foi possível buscar as séries de categoria: ' + categoria);
  }
}

async function buscaFilmePorId(id: string) {
  try {
    const { data } = await axios.get(moviePath + id + '?append_to_response=videos,images&language=pt-br');
    return data;
  } catch (err) {
    throw new Error('Não foi encontrar o filme solicitado');
  }
}
async function buscaSeriePorId(id: string) {
  try {
    const { data } = await axios.get(seriesPath + id + '?append_to_response=videos,images&language=pt-br');
    return data;
  } catch (err) {
    throw new Error('Não foi encontrar o filme solicitado');
  }
}
export { buscaSeriesPorCategoria, buscaFilmesPorCategoria, buscaFilmePorId, buscaSeriePorId };
