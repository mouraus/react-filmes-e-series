import './Series.css';

import { useEffect, useState } from 'react';
import NavBar from '../../components/shared/navBar/NavBar';
import Programa from '../../types/Programa';
import { useRequest } from 'ahooks';
import ReactPaginate from 'react-paginate';
import { Skeleton } from '@mui/material';
import CardFilm from '../../components/shared/cardFilm/CardFilm';
import { buscaSeriesPorListaPaginado } from '../../services/tmdbService';

function Series() {
  const [series, setSeries] = useState<Programa[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);

  const { run: buscarSeriesPorCategoria, loading: carregandoBuscarSerie } = useRequest(buscaSeriesPorListaPaginado, {
    manual: true,
    onSuccess: (res) => {
      handleRemoverSeriesSemCapa(res.results);
      setPaginaAtual(res.page);
    },
  });

  useEffect(() => {
    buscarSeriesPorCategoria('popular', paginaAtual);
  }, [buscarSeriesPorCategoria, paginaAtual]);

  function handleRemoverSeriesSemCapa(series: Programa[]) {
    const seriesFiltrado = series.filter((f) => f.poster_path);
    setSeries(seriesFiltrado);
  }
  function handlePageClick(p: number) {
    setPaginaAtual(p + 1);
  }

  return (
    <>
      <NavBar />
      <div className='container container-config'>
        <div className='seriesArea mt-5'>
          {!carregandoBuscarSerie ? (
            series.map((p, index) => {
              return <CardFilm item={p} key={index} />;
            })
          ) : (
            <Skeleton className='mt-5' variant='rounded' width={'65vw'} height={'100vh'} sx={{ bgcolor: 'grey.900' }} />
          )}
        </div>
        <div className='d-flex mt-5'>
          <ReactPaginate
            nextLabel='>'
            onPageChange={(e) => handlePageClick(e.selected)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={500}
            previousLabel='<'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
            renderOnZeroPageCount={null}
          />{' '}
        </div>
      </div>
    </>
  );
}

export default Series;
