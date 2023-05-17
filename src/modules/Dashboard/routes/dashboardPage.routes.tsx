import { lazy } from 'react';
import { ADMIN_R } from 'utils/constants';
import { CustomRouteObject } from 'models';

const DashboardPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/Dashboard'));

export const dashboardPageRoutes: CustomRouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    layout: 'App',
    roles: [ADMIN_R],
  },
];
