import { Suspense } from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//layouts & pages
// import { PrintLayout } from 'components/layouts/PrintLayout';
import { AppLayout, AuthLayout } from 'modules/common/components';
import ErrorBoundryPage from 'modules/ErrorBoundry/page/ErrorBoundryPage';

//utils
import { t } from 'i18next';
import { APPLICATION_ROUTES, LOGIN_ROUTES } from './APPLICATION_ROUTES';

//types
import { User } from 'models/User.type';

const PrintLayout = () => <></>;

const LayoutMap = {
  App: <AppLayout />,
  Login: <AuthLayout />,
  Print: <PrintLayout />,
};

export const getRoutes = (user: User | null) => {
  if (!user) {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<ErrorBoundryPage fallback={<div>{t('SmWentWrong')}</div>} />}>
          {LOGIN_ROUTES.map((r, i) => (
            <Route key={i} element={LayoutMap[r.layout]}>
              <Route
                path={r.path}
                element={<Suspense fallback='Loading...'>{r.element}</Suspense>}
              />
            </Route>
          ))}
        </Route>,
      ),
    );
  }

  return createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorBoundryPage fallback={<div>{t('SmWentWrong')}</div>} />}>
        {APPLICATION_ROUTES.map((r, i) => (
          <Route key={i} element={LayoutMap[r.layout]}>
            {r.roles.includes(user.role) ? (
              <Route
                path={r.path}
                element={<Suspense fallback='Loading...'>{r.element}</Suspense>}
              />
            ) : (
              <Route path='*' element={<Navigate to='*' />} />
            )}
          </Route>
        ))}
      </Route>,
    ),
  );
};
