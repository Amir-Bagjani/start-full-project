import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const LoginPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/LoginPage'));

export const loginPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.login,
    element: <LoginPage />,
    layout: 'Login',
    roles: ROLES,
  },
];
