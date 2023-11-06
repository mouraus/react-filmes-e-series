import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Filmes from '../pages/filmes/Filmes';
import VisualizarPrograma from '../pages/visualizarPrograma/VisualizarPrograma';
import Series from '../pages/series/Series';
import FilmesPorCategoria from '../pages/filmesPorCategoria/FilmesPorCategoria';
import BuscarProgramas from '../pages/buscarProgramas/BuscarProgramas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/filmes',
    element: <Filmes />,
  },
  {
    path: '/f',
    element: <FilmesPorCategoria/>,
  },
  {
    path: '/procurar',
    element: <BuscarProgramas/>,
  },
  {
    path: '/series',
    element: <Series />,
  },
  {
    path: '/programa/:tipo/:id',
    element: <VisualizarPrograma/>,
  },
]);

export default router;
