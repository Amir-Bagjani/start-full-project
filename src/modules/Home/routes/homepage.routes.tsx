import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';

const HomePage = lazy(() => import(/* webpackPrefetch: true */ '../pages/HomePage'));

export const homePageRoutes: CustomRouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    layout: 'App',
    roles: ROLES,
  },
];
