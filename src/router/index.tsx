import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Filmes from '../pages/filmes/Filmes';
import VisualizarPrograma from '../pages/visualizarPrograma/VisualizarPrograma';
import Series from '../pages/series/Series';

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
    path: '/series',
    element: <Series />,
  },
  {
    path: '/programa/:tipo/:id',
    element: <VisualizarPrograma/>,
  },
]);

export default router;
