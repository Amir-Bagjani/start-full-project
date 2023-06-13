import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const HomePage = lazy(() => import(/* webpackPrefetch: true */ '../pages/HomePage'));

export const homePageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.home,
    element: <HomePage />,
    layout: 'App',
    layoutProps: { hiddenBreadcrumbs: true },
    roles: ROLES,
  },
];
