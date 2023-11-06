import { useSearchParams } from 'react-router-dom';
import NavBar from '../../components/shared/navBar/NavBar';
import { useRequest } from 'ahooks';
import { buscarProgramasPorTermoDeBusca } from '../../services/tmdbService';
import { useEffect, useState } from 'react';
import Filme from '../../types/Filme';
import ReactPaginate from 'react-paginate';
import { Skeleton } from '@mui/material';
import CardFilm from '../../components/shared/cardFilm/CardFilm';

function BuscarProgramas() {
  const [searchParams] = useSearchParams();

  function handleRemoverPessoasDaResposta(programas: Filme[]){
    const arr = programas.filter((c) =>( c.media_type != 'person' && c.poster_path));
    setFilmes(arr);
  }
  const { run: buscarProgramas, loading: carregandoBuscarFilmes } = useRequest(
    buscarProgramasPorTermoDeBusca,
    {
      manual: true,
      onSuccess: (res) => {
        handleRemoverPessoasDaResposta(res.results);
        setQtdTotalDePaginas(res.total_pages);
      },
    },
  );

  const [filmes, setFilmes] = useState<Filme[]>([]);

  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [qtdTotalDePaginas, setQtdTotalDePaginas] = useState<number>(0);

  useEffect(() => {
    buscarProgramas(searchParams.get('termoDeBusca')!, paginaAtual);
  }, [buscarProgramas, paginaAtual, searchParams]);

  function handlePageClick(p: number) {
    setPaginaAtual(p + 1);
  }
  function retornaTermoDeBusca() {
    const termoDeBusca = searchParams.get('termoDeBusca');

    if (termoDeBusca) {
      return termoDeBusca;
    } else {
      return '';
    }
  }

  return (
    <>
      <NavBar />
      <div className='container container-config'>
        <div className='d-flex w-100 justify-content-start mt-5'>
          <h1 className='text-secondary'><strong>Termo de Busca:</strong> {retornaTermoDeBusca()}</h1>
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
            pageCount={qtdTotalDePaginas}
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

export default BuscarProgramas;
