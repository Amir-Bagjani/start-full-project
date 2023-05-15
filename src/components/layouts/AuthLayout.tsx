import { useUser } from 'modules/common/hooks';
import { Navigate, Outlet } from 'react-router-dom';

// const user: any = null;
// const user = {name: "saeed"};

export const AuthLayout = () => {
  const { user } = useUser();

  if (!!user) return <Navigate to='/' />;

  return (
    <div>
      <Outlet />
      <footer>copywrit 2023</footer>
    </div>
  );
};
