import { lazy } from 'react';
import { ADMIN_R } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const ExpenseDashboardPage = lazy(
  () => import(/* webpackPrefetch: true */ '../pages/ExpenseDashboardPage'),
);

export const expensePageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expense.dashboard,
    element: <ExpenseDashboardPage />,
    layout: 'App',
    roles: [ADMIN_R],
  },
];
