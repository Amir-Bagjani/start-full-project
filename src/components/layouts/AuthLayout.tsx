import { Navigate, Outlet } from 'react-router-dom';
import { user } from './user';

// const user: any = null;
// const user = {name: "saeed"};

const AuthLayout = () => {
  if (!!user) return <Navigate to='/' />;

  return (
    <div>
      <Outlet />
      <footer>copywrit 2023</footer>
    </div>
  );
};

export default AuthLayout;
