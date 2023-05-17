import { useUser } from 'modules/common/hooks';
import { RouterProvider } from 'react-router-dom';
import { getRoutes } from 'routes/routes';
// import { routes } from './routes/routes';

const App = () => {
  const { user } = useUser();

  return <RouterProvider router={getRoutes(user)} />;
};

export default App;
