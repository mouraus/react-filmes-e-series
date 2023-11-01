import { useRequest } from 'ahooks';
import { buscaCategoriasPorTipo } from '../../../services/categoriaService';
import { useState } from 'react';
import Categoria from '../../../types/Categoria';
import './FilterCategorias.css';

function FilterCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useRequest(buscaCategoriasPorTipo, {
    manual: false,
    defaultParams: ['movie'],
    onSuccess: (result) => {
      setCategorias(result.genres.slice(0, 14));
    },
  });
  return (
    <>
      <div className='d-flex flex-column'>
        <span className='tituloCategoriasFilter mb-3'>NAVEGUE PELA CATEGORIA QUE VOCÊ MAIS GOSTA!</span>
        <div className='categoriaFilterContainer mb-5'>
          {categorias.map((c, index) => {
            return <a className='categoriaFilter' key={index}>{c.name}</a>;
          })}
        </div>
      </div>
    </>
  );
}

export default FilterCategorias;
