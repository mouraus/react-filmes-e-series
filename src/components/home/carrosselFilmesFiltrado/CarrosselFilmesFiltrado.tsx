import { useEffect, useState } from 'react';
import Filme from '../../../types/Filme';
import { buscaFilmesPorCategoria } from '../../../services/tmdbService';
import { useRequest } from 'ahooks';
import CarrosselFilmes from '../carrosselFilmes/CarrosselFilmes';
import './CarrosselFilmesFiltrado.css';
import { Skeleton } from '@mui/material';

function CarrosselFilmesFiltrado() {
  const [filmesSelecionados, setFilmesSelecionados] = useState<Filme[]>([]);
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>('now_playing');

  const categorias = [
    {
      titulo: 'Lançamentos',
      categoria: 'now_playing',
      icon: 'fa-regular fa-star ',
    },
    {
      titulo: 'Recomendado',
      categoria: 'top_rated',
      icon: 'fa-solid fa-fire ',
    },
    {
      titulo: 'Mais Assistidos',
      categoria: 'popular',
      icon: 'fa-solid fa-eye ',
    },
  ];
  const {loading: carregando, run: runBuscarFilmes} = useRequest(buscaFilmesPorCategoria, {
    manual: true,
    defaultParams: [filtroSelecionado],
    onSuccess: (res) => {
      setFilmesSelecionados(res.results);
    }
  });

  useEffect(() => {
    runBuscarFilmes(filtroSelecionado);
  },[filtroSelecionado, runBuscarFilmes]);

  async function handleHabilitarCategoria(indexCategoria: number) {
    setFiltroSelecionado(categorias[indexCategoria].categoria);
  }
  return (
    <>
      <div className='d-flex justify-content-between w-50 mx-auto flex-md-row flex-column'>
        {categorias.map((c, index) => (
          <div
            key={index}
            className={
              filtroSelecionado != c.categoria
                ? 'filtroDisable d-flex flex-column justify-content-center align-items-center categoria my-5 mx-auto'
                : 'd-flex flex-column justify-content-center align-items-center categoria my-5 mx-auto'
            }
            style={{ gap: '10px' }}
            onClick={() => handleHabilitarCategoria(index)}
          >
            <i className={filtroSelecionado != c.categoria ? c.icon + 'filtroDisable' : c.icon}></i>
            {c.titulo}
          </div>
        ))}
      </div>

      {carregando == true ? (
        <Skeleton className='mx-auto my-5' variant='rounded' height={'200px'} width={'98vw'} sx={{ bgcolor: 'grey.900' }} />
      ) : (
        <CarrosselFilmes titulo='' filmsList={filmesSelecionados} width={90}/>
      )}
    </>
  );
}

export default CarrosselFilmesFiltrado;
