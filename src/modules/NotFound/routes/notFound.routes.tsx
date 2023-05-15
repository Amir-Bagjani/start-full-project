import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';

const NotFoundPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/NotFoundPage'));

export const notFoundPageRoutes: CustomRouteObject[] = [
  {
    path: '*',
    element: <NotFoundPage />,
    layout: 'App',
    roles: ROLES,
  },
];
