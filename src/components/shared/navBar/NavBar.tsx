import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import SearchInput from '../searchInput/SearchInput';
import { useState } from 'react';

function NavBar() {
  const [mostrarInputSearch, setMostrarInputSearch] = useState<boolean>(false);

  return (
    <div className='navBarContainer p-3'>
      <div className='d-flex container mt-1'>
        <Link to={'/'}>
          <h4 className='w-25 mb-auto text-light'>Moura TV</h4>
        </Link>
        <div className='menu-area'>
          <div className='menu-items'>
            <NavLink to={'/'} className='menu-item'>
              <i className='fa-solid fa-house'></i>
              <span>Home</span>
            </NavLink>
            <NavLink to={'/filmes'} className='menu-item'>
              <i className='fa-solid fa-film'></i>
              <span>Filmes</span>
            </NavLink>
            <NavLink to={'/series'} className='menu-item'>
              <i className='fa-solid fa-circle-play'></i>
              <span>Séries</span>
            </NavLink>
          </div>
          <div className='searchArea'>
            <i className={mostrarInputSearch ? 'd-none' :'fa-solid fa-magnifying-glass'}  onClick={() => setMostrarInputSearch(true)}></i>
            <SearchInput setAberto={setMostrarInputSearch} aberto={mostrarInputSearch}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
