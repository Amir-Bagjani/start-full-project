import { lazy } from 'react';

//utils
import { ROUTES_NAME } from 'routes/routesName';
import { ADMIN_R, ROLES } from 'utils/constants';

//types
import { CustomRouteObject } from 'models';

const ExpenseDashboardPage = lazy(
  () => import(/* webpackPrefetch: true */ '../pages/ExpenseDashboardPage'),
);
const ExpensesPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/ExpensesPage'));

export const expensePageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expense.dashboard,
    element: <ExpenseDashboardPage />,
    layout: 'App',
    roles: [ADMIN_R],
  },
  {
    path: ROUTES_NAME.expense.base,
    element: <ExpensesPage />,
    layout: 'App',
    roles: ROLES,
  },
];
