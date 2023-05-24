import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

//components
import { Navbar } from 'modules/common/components';

//utils
import { useUser } from 'modules/common/hooks';

export const AppLayout = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  if (!user) return <Navigate to='/login' />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
