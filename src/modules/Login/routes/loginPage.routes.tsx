import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';

const LoginPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/LoginPage'));

export const loginPageRoutes: CustomRouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
    layout: 'Login',
    roles: ROLES,
  },
];
