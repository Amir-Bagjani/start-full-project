import { Navigate, Outlet } from 'react-router-dom';
import { user } from './user';

const PrintLayout = () => {
  if (!!!user?.name) return <Navigate to='/login' />;
  return <Outlet />;
};

export default PrintLayout;
