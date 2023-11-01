import { useEffect, useState } from 'react';
import Filme from '../../../types/Filme';
import './CarrosselFilmes.css';
import { Skeleton } from '@mui/material';
import CardFilm from '../../shared/cardFilm/CardFilm';

function CarrosselFilmes({ filmsList, titulo, width }: { filmsList: Filme[]; titulo: string; width: number }) {
  const [scrollX, setScrollX] = useState(-30);

  useEffect(() => {
    setScrollX(-30);
  }, [filmsList]);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round((window.innerWidth * (width / 100)) / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round((window.innerWidth * (width / 100)) / 2);
    const listWidth = filmsList.length * 150;
    if (window.innerWidth * (width / 100) - listWidth > x) {
      x = window.innerWidth * (width / 100) - listWidth - 60;
    }
    setScrollX(x);
  };

  return (
    <>
      {filmsList.length > 0 ? (
        <>
          <span className='tituloCarrossel'>{titulo}</span>
          <div className='carousel'>
            <div className='carousel-inner'>
              <div className='carousel-item active'>
                <div className='movieRow'>
                  <div className='movieRow__listArea'>
                    <div
                      className='movieRow__list'
                      style={{
                        marginLeft: scrollX,
                        width: filmsList.length * 150,
                      }}
                    >
                      {filmsList.length > 0 &&
                        filmsList.map((item, key) => (
                          <CardFilm item={item} key={key}/>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a className='carousel-control-prev movieRow__left' onClick={handleLeftArrow}>
              <span className='carousel-control-prev-icon' aria-hidden='true'></span>
              <span className='sr-only'></span>
            </a>
            <a className='carousel-control-next movieRow__right' onClick={handleRightArrow}>
              <span className='carousel-control-next-icon' aria-hidden='true'></span>
              <span className='sr-only'></span>
            </a>
          </div>
        </>
      ) : (
        <Skeleton className='mx-auto' variant='rounded' height={'200px'} width={'98vw'} sx={{ bgcolor: 'grey.900' }} />
      )}
    </>
  );
}
export default CarrosselFilmes;
