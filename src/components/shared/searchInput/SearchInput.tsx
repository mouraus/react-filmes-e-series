import { FormEvent, useEffect, useState } from 'react';
import './SearchInput.css';
import { useNavigate } from 'react-router-dom';

function SearchInput({aberto, setAberto}:{aberto: boolean, setAberto:React.Dispatch<boolean>}) {

  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue('');
  }, [aberto]);

  function procurarProgramas(event: React.MouseEvent | FormEvent<HTMLFormElement>){
    event.preventDefault();
    setAberto(false);
    navigate('/procurar?termoDeBusca=' + searchValue);
  }

  return (
    <>
      <form className={aberto ? 'px-5 py-1' : 'd-none'} id='searchForm' onSubmit={(e) => procurarProgramas(e)}>
        <div className='mb-auto d-flex justify-content-end'>
          <span className='mb-2' onClick={() => setAberto(false)}>X</span>
        </div>
        <div className='inputArea p-1'>
          <input placeholder='Digite aqui...' value={searchValue} type='text' className='inputSearch'  onChange={(e) => setSearchValue(e.currentTarget.value)}/>
          <i className='fa-solid fa-magnifying-glass' onClick={(e) => procurarProgramas(e)}></i>
        </div>
      </form>
    </>
  );
}

export default SearchInput;
