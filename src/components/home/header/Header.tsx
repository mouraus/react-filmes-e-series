import { Skeleton } from '@mui/material';
import { headerStyle } from './Header.style';
import { retornaImagem } from '../../../services/imgService';
import { useEffect, useState } from 'react';
import Programa from '../../../types/Programa';
import NavBar from '../../shared/navBar/NavBar';
import { Link } from 'react-router-dom';

function Header({ filmesList }: { filmesList: Programa[] }) {
  const [filmeEmDestaque, setFilmeEmDestaque] = useState<Programa>();

  function escolheFilme(filmesList: Programa[]) {
    let indexFilmeAleatorio = parseInt((Math.random() * 20).toFixed());

    while (indexFilmeAleatorio > filmesList.length - 1) {
      indexFilmeAleatorio = parseInt((Math.random() * 20).toFixed());
    }
    setFilmeEmDestaque(filmesList[indexFilmeAleatorio]);
  }

  useEffect(() => {
    escolheFilme(filmesList);
  }, [filmesList]);

  return (
    <>
      {filmeEmDestaque == undefined ? (
        <Skeleton variant='rectangular' width={'100%'} height={'60vh'} sx={{ bgcolor: 'grey.900' }} />
      ) : (
        <div
          className='d-flex flex-column justify-content-start align-items-center'
          style={headerStyle(retornaImagem(filmeEmDestaque.backdrop_path))}
        >
          <NavBar/>
          <div className='d-flex flex-column jutify-content-center w-100 mt-5'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1 className='mb-3'>{filmeEmDestaque.title}</h1>
              <div className='d-flex justify-content-center align-items-center' style={{ gap: '5px' }}>
                <i className='fa-solid fa-star'></i>
                <span>
                  {filmeEmDestaque.vote_average.toPrecision(2) +
                    '/10 - ' +
                    filmeEmDestaque.release_date!.substring(0, 4)}
                </span>
              </div>
            </div>
            <p className='w-75 mx-auto text-center my-2'>
              {filmeEmDestaque.overview}
            </p>
            <div className='w-50 d-flex mx-auto mt-3'>
              <Link to={`/programa/movie/${filmeEmDestaque.id}`} className='btn btn-danger mx-auto w-50'>Saiba Mais</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
