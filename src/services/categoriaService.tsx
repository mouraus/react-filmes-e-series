import axios from '../axios/index';

const moviePath = '/3/genre/';

async function buscaCategoriasPorTipo(tipo: string) {
  try {
    const { data } = await axios.get(moviePath + tipo + '/list?language=pt-BR');
    return data;
  } catch (err) {
    throw new Error('Não foi possível buscar as categorias');
  }
}
export { buscaCategoriasPorTipo };
