import { t } from 'i18next';
import { lazy, Suspense } from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//layouts & pages
// import { PrintLayout } from 'components/layouts/PrintLayout';
import { AppLayout, AuthLayout } from 'modules/common/components';
import ErrorBoundryPage from 'modules/ErrorBoundry/page/ErrorBoundryPage';

//utils
import { ROUTES_NAME } from './routesName';
import { APPLICATION_ROUTES, LOGIN_ROUTES } from './APPLICATION_ROUTES';

//types
import { User } from 'models/User.type';
import { CustomRouteObject } from 'models';

const NotActiveContract = lazy(
  () => import(/* webpackPrefetch: true */ 'modules/Home/pages/NotActiveContract'),
);

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
          <Route path='*' element={<Navigate to={ROUTES_NAME.login} />} />
        </Route>,
      ),
    );
  }

  if (!user.UserHasActiveContract) {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<ErrorBoundryPage fallback={<div>{t('SmWentWrong')}</div>} />}>
          {invalidRoutes()}
          <Route path='*' element={<Navigate to={ROUTES_NAME.home} />} />
        </Route>,
      ),
    );
  }

  return createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorBoundryPage fallback={<div>{t('SmWentWrong')}</div>} />}>
        {validRoutes(APPLICATION_ROUTES, user)}
        <Route path='*' element={<Navigate to={ROUTES_NAME.notFound} />} />
      </Route>,
    ),
  );
};

const validRoutes = (routes: CustomRouteObject[], user: User) => {
  return routes.map((r, i) => (
    <Route key={i} element={LayoutMap[r.layout]}>
      {r.roles.includes(user.role) && (r.extrCheck?.(user) ?? true) ? (
        <Route path={r.path} element={<Suspense fallback='Loading...'>{r.element}</Suspense>} />
      ) : (
        <Route path='*' element={<Navigate to={ROUTES_NAME.notFound} />} />
      )}
    </Route>
  ));
};

const invalidRoutes = () => {
  return (
    <Route element={<AppLayout />}>
      <Route
        path={ROUTES_NAME.home}
        element={
          <Suspense fallback='Loading...'>
            <NotActiveContract />
          </Suspense>
        }
      />
    </Route>
  );
};
