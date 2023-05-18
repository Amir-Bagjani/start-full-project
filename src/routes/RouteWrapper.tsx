import { RouterProvider } from 'react-router-dom';

//utils
import { getRoutes } from './routes';

//types
import { useUser } from 'modules/common/hooks';

export const RouteWrapper = () => {
  const { user } = useUser();

  return <RouterProvider router={getRoutes(user)} />;
};
