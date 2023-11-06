import './Home.css';
import { buscaFilmesPorCategoria } from '../../services/tmdbService';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import Programa from '../../types/Programa';
import Header from '../../components/home/header/Header';
import CarrosselFilmesFiltrado from '../../components/home/carrosselFilmesFiltrado/CarrosselFilmesFiltrado';
import CarrosselFilmes from '../../components/home/carrosselFilmes/CarrosselFilmes';
import { buscaSeriesPorCategoria } from '../../services/tmdbService';
import FilterCategorias from '../../components/home/filterCategorias/FilterCategorias';
function Home() {
  const [filmesEmCartazList, setFilmesEmCartazList] = useState<Programa[]>([]);
  const [series, setSeries] = useState<Programa[]>([]);

  useRequest(buscaFilmesPorCategoria, {
    manual: false,
    defaultParams: ['now_playing'],
    onSuccess: (result) => {
      setFilmesEmCartazList(result.results);
    },
  });

  useRequest(buscaFilmesPorCategoria, {
    manual: false,
    defaultParams: ['now_playing'],
    onSuccess: (result) => {
      setFilmesEmCartazList(result.results);
    },
  });

  useRequest(buscaSeriesPorCategoria, {
    manual: false,
    defaultParams: ['popular'],
    onSuccess: (result) => {
      setSeries(result.results);
    },
  });

  return (
    <>
      {filmesEmCartazList.length > 0 && (
        <>
          <Header filmesList={filmesEmCartazList} />
          <CarrosselFilmesFiltrado />
          <div>
            <FilterCategorias />
            <div className='container-carrosseis mx-auto'>
              <CarrosselFilmes filmsList={filmesEmCartazList} titulo='Filmes' width={65} />
              <CarrosselFilmes filmsList={series} titulo='Séries' width={65} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
