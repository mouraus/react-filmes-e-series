import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Filmes from '../pages/filmes/Filmes';
import VisualizarPrograma from '../pages/visualizarPrograma/VisualizarPrograma';
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
    path: '/programa/:tipo/:id',
    element: <VisualizarPrograma/>,
  },
]);

export default router;
