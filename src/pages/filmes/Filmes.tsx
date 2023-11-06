import { useEffect, useState } from 'react';
import NavBar from '../../components/shared/navBar/NavBar';
import './Filmes.css';
import Programa from '../../types/Programa';
import { useRequest } from 'ahooks';
import { buscaFilmesPorListaPaginado } from '../../services/tmdbService';
import ReactPaginate from 'react-paginate';
import { Skeleton } from '@mui/material';
import CardFilm from '../../components/shared/cardFilm/CardFilm';

function Filmes() {
  const [filmes, setFilmes] = useState<Programa[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);

  const { run: bucarFilmesPaginado, loading: carregandoBuscarFilme } = useRequest(buscaFilmesPorListaPaginado, {
    manual: true,
    onSuccess: (res) => {
      handleRemoverFilmesSemCapa(res.results);
      setPaginaAtual(res.page);
    },
  });

  useEffect(() => {
    bucarFilmesPaginado('popular', paginaAtual);
  }, [bucarFilmesPaginado, paginaAtual]);

  function handleRemoverFilmesSemCapa(filmes: Programa[]) {
    const filmesFiltrado = filmes.filter((f) => f.poster_path);
    setFilmes(filmesFiltrado);
  }

  function handlePageClick(p: number) {
    setPaginaAtual(p + 1);
  }

  return (
    <>
      <NavBar />
      <div className='container container-config'>
        <div className='filmesArea mt-5'>
          {!carregandoBuscarFilme ? (
            filmes.map((p, index) => {
              return <CardFilm item={p} key={index} />;
            })
          ) : (
            <Skeleton variant='rounded' width={'80vw'} height={'100vh'} sx={{ bgcolor: 'grey.900' }} />
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
            nextClassName='page-item bg-dark'
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

export default Filmes;
