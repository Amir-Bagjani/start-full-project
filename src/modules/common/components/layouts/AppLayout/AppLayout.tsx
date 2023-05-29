import { Container } from '@mui/material';
// import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

//components
import { Navbar } from 'modules/common/components';

//utils
import { useUser } from 'modules/common/hooks';
import { ROUTES_NAME } from 'routes/routesName';

export const AppLayout = () => {
  // const { t } = useTranslation();
  const { user } = useUser();

  if (!user) return <Navigate to={ROUTES_NAME.login} />;

  return (
    <>
      <Navbar />
      <Container sx={{ maxWidth: '1260px' }}>
        <Outlet />
      </Container>
    </>
  );
};
