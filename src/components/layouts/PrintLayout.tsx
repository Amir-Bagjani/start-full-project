import { useUser } from 'modules/common/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const PrintLayout = () => {
  const { user } = useUser();

  if (!user) return <Navigate to='/login' />;
  return <Outlet />;
};
