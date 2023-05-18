import { lazy } from 'react';
import { ADMIN_R } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const DashboardPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/Dashboard'));

export const dashboardPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.dashboard,
    element: <DashboardPage />,
    layout: 'App',
    roles: [ADMIN_R],
  },
];
