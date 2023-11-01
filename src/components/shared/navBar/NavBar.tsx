import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className='navBarContainer p-3'>
      <div className='d-flex container mt-1'>
        <h4 className='w-25 mb-auto'>Moura TV</h4>
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
            <i className='fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
