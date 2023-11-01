/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import NavBar from '../../components/shared/navBar/NavBar';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { buscaFilmePorId, buscaSeriePorId } from '../../services/tmdbService';
import Categoria from '../../types/Categoria';
import { Skeleton } from '@mui/material';
import './VisualizarPrograma.css';
import YoutubePlayer from '../../components/shared/youtubePlayer/YoutubePlayer';

function VisualizarPrograma() {
  const { tipo, id } = useParams<string>();

  const [programa, setPrograma] = useState<any>();
  const [generos, setGeneros] = useState<Categoria[]>();

  const { run: buscarFilmePorId } = useRequest(buscaFilmePorId, {
    manual: true,
    defaultParams: [id!],
    onSuccess: (result) => {
      setPrograma(result);
      setGeneros(result.genres);
    },
  });

  const { run: buscarSeriePorId } = useRequest(buscaSeriePorId, {
    manual: true,
    defaultParams: [id!],
    onSuccess: (result) => {
      setPrograma(result);
      setGeneros(result.genres);
    },
  });
  useEffect(() => {
    if (tipo == 'movie') {
      buscarFilmePorId(id!);
    } else {
      buscarSeriePorId(id!);
    }
  }, [buscarFilmePorId, buscarSeriePorId, id, tipo]);
  return (
    <>
      <NavBar />
      <div className='container mt-5'>
        {programa ? (
          <div className='d-flex flex-column'>
            <div className='cardArea d-flex flex-column flex-md-row'>
              <img className='poster' src={`https://image.tmdb.org/t/p/w500${programa.poster_path}`} alt={programa.name} />
              <div className='d-flex flex-column infoDetail'>
                <h3>{programa.title}</h3>
                <div className='d-flex align-items-center areaAnoENota'>
                  <span className='averageInfoArea'>
                    <i style={{ color: 'gold' }} className='fa-regular fa-star'></i>
                    <span style={{ color: 'gold' }}>{programa.vote_average.toPrecision(2) + '/10'}</span>
                  </span>
                  <span className='programaAno'>
                    {programa.release_date
                      ? programa.release_date.substring(0, 4)
                      : programa.first_air_date.substring(0, 4)}
                  </span>
                </div>
                <div className='categoriaProgramaArea'>
                  {generos?.map((g, index) => {
                    return (
                      <span key={index} className='categoriaItem'>
                        {g.name}
                      </span>
                    );
                  })}
                </div>
                <p>{programa.overview}</p>
                <div className='trailerArea'>
                  <YoutubePlayer video={programa.videos.results[0]} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='carregandoCardArea'>
            <Skeleton variant='rounded' height={'450px'} width={'320px'} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant='rounded' height={'450px'} width={'100%'} sx={{ bgcolor: 'grey.900' }} />
          </div>
        )}
      </div>
    </>
  );
}

export default VisualizarPrograma;
