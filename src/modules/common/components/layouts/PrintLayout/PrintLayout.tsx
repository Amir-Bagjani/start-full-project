import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

//components
import { AiFillPrinter } from 'react-icons/ai';
import { Button } from 'modules/common/components';

//utils
import { useUser } from 'modules/common/hooks';
import { ROUTES_NAME } from 'routes/routesName';

export const PrintLayout = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const printTable = useRef(null);

  if (!user) return <Navigate to={ROUTES_NAME.login} />;

  return (
    <main>
      <Container sx={{ maxWidth: '1360px', py: 8, bgcolor: 'transparent' }}>
        <ReactToPrint
          trigger={() => <Button endIcon={<AiFillPrinter />}>{t('PrintLayoutPrint')}</Button>}
          content={() => printTable.current}
        />
        <article ref={printTable}>
          <Outlet />
        </article>
      </Container>
    </main>
  );
};
