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
async function buscaFilmesPorListaPaginado(lista: string, pagina: number) {
  try {
    const { data } = await axios.get(moviePath + lista + '?language=pt-BR&page=' + pagina);
    return data;
  } catch (err) {
    throw new Error('error');
  }
}
async function buscaSeriesPorListaPaginado(lista: string, pagina: number) {
  try {
    const { data } = await axios.get(seriesPath + lista + '?language=pt-BR&page=' + pagina);
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
    throw new Error('Não foi possível encontrar o filme solicitado');
  }
}
async function buscaSeriePorId(id: string) {
  try {
    const { data } = await axios.get(seriesPath + id + '?append_to_response=videos,images&language=pt-br');
    return data;
  } catch (err) {
    throw new Error('Não foi possível encontrar o filme solicitado');
  }
}

async function buscarFilmesPaginadoPorCategoria(categoriasIds: string, pagina: number) {
  try{
    const { data } = await axios.get(`/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${pagina}&sort_by=popularity.desc&with_genres=${categoriasIds}`);
    return data;
  }catch(err){
    throw new Error('Não foi possível encontrar o filme solicitado');
  }
}

async function buscarProgramasPorTermoDeBusca(query:string, pagina: number) {
  try{
    const { data } = await axios.get(`/3/search/multi?query=${query}&include_adult=false&language=pt-br&page=${pagina}`);
    return data;
  }catch(err){
    throw new Error('Não foi possível encontrar o filme solicitado');
  }
}
export { buscaSeriesPorCategoria, buscaFilmesPorCategoria, buscaFilmePorId, buscaSeriePorId, buscaFilmesPorListaPaginado, buscaSeriesPorListaPaginado, buscarFilmesPaginadoPorCategoria, buscarProgramasPorTermoDeBusca };
