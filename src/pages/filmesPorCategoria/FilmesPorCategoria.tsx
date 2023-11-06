import { useSearchParams } from 'react-router-dom';
import NavBar from '../../components/shared/navBar/NavBar';
import { useRequest } from 'ahooks';
import { buscarFilmesPaginadoPorCategoria } from '../../services/tmdbService';
import { useEffect, useState } from 'react';
import Filme from '../../types/Filme';
import ReactPaginate from 'react-paginate';
import { Skeleton } from '@mui/material';
import CardFilm from '../../components/shared/cardFilm/CardFilm';

function FilmesPorCategoria() {
  const [searchParams] = useSearchParams();


  const { run: buscarFilmesPorCategoria, loading: carregandoBuscarFilmes } = useRequest(
    buscarFilmesPaginadoPorCategoria,
    {
      manual: true,
      onSuccess: (res) => {
        setFilmes(res.results);
        setQtdTotalDePaginas(res.total_pages);
      },
    },
  );

  const [filmes, setFilmes] = useState<Filme[]>([]);

  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [qtdTotalDePaginas, setQtdTotalDePaginas] = useState<number>(0);

  useEffect(() => {
    buscarFilmesPorCategoria(searchParams.get('categoriaId')!, paginaAtual);
  }, [buscarFilmesPorCategoria, paginaAtual, searchParams]);

  function handlePageClick(p: number) {
    setPaginaAtual(p + 1);
  }
  function retornaNomeCategoriaBuscada() {
    const categoria = searchParams.get('categoria');

    if (categoria) {
      return categoria;
    } else {
      return '';
    }
  }

  return (
    <>
      <NavBar />
      <div className='container container-config'>
        <div className='d-flex w-100 justify-content-start'>
          <h1 className='text-secondary mt-5'><strong>Categoria: </strong>{retornaNomeCategoriaBuscada()}</h1>
        </div>
        <div className='filmesArea mt-5'>
          {!carregandoBuscarFilmes ? (
            filmes.map((p, index) => {
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
            pageCount={qtdTotalDePaginas > 500 ? 500 : qtdTotalDePaginas}
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

export default FilmesPorCategoria;
