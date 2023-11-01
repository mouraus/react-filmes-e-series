import { Link } from 'react-router-dom';
import Filme from '../../../types/Filme';
import './cardFilm.css';
function CardFilm({item, key}:{item:Filme, key: number}) {
  return (
    <>
      <Link
        to={`/programa/${item.title ? 'movie' : 'serie'}/${item.id}`}
        className='movieRow__item'
        key={key}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w300${item.poster_path})`,
          backgroundPosition: 'bottom',
        }}
      >
        <div className='infoArea'>
          <div className='areaInfo'>
            <span>{item.title ? item.title : item?.name}</span>
            <span className='average_infoArea'>
              <i style={{ color: 'gold' }} className='fa-regular fa-star'></i>
              <span style={{ color: 'gold' }}>{item.vote_average.toPrecision(2) + '/10'}</span>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardFilm;
