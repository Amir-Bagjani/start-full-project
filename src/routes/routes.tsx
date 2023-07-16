import { t } from 'i18next';
import { lazy, Suspense } from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//layouts & pages
import ErrorBoundryPage from 'modules/ErrorBoundry/page/ErrorBoundryPage';
import { AppLayout, AuthLayout, PrintLayout } from 'modules/common/components';

//utils
import { ROUTES_NAME } from './routesName';
import { APPLICATION_ROUTES, LOGIN_ROUTES } from './APPLICATION_ROUTES';

//types
import type { ComponentProps } from 'react';
import type { User } from 'models/User.type';
import type { CustomRouteObject } from 'models';

const NotActiveContract = lazy(
  () => import(/* webpackPrefetch: true */ 'modules/Home/pages/NotActiveContract'),
);

const LayoutMap = {
  App: (props: ComponentProps<typeof AppLayout> = {}) => <AppLayout {...props} />,
  Login: (props = {}) => <AuthLayout {...props} />,
  Print: (props = {}) => <PrintLayout {...props} />,
};

export const getRoutes = (user: User | null) => {
  if (!user) {
    return createBrowserRouter(
      createRoutesFromElements(
        // TODO: create good fallback for error page
        // TODO: make ErrorBoundryPage better in design and add some detail to it.
        <Route errorElement={<ErrorBoundryPage fallback={<div>{t('SmWentWrong')}</div>} />}>
          {LOGIN_ROUTES.map((r, i) => (
            <Route key={i} element={LayoutMap[r.layout](r.layoutProps)}>
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
    <Route key={i} element={LayoutMap[r.layout](r.layoutProps)}>
      {r.roles.includes(user.role) && (r.extrCheck?.(user) ?? true) ? (
        // TODO: change loading... with Loading Component
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
      {/* TODO: add user profile route, guide route and some information about not active account to user */}
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
