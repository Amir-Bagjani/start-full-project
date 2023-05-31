import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const NotFoundPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/NotFoundPage'));

export const notFoundPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.notFound,
    element: <NotFoundPage />,
    layout: 'App',
    roles: ROLES,
  },
];
