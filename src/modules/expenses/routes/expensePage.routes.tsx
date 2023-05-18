import { lazy } from 'react';
import { ADMIN_R, COUNTER_R, EDITOR_R, INSURER_R, REGISTRAR_R, ROLES } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const ExpensesPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/ExpensesPage'));
const PrintPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/PrintPage'));
const DetailPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/DetailPage'));
const AddPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/AddPage'));

export const expensePageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expenses.base,
    element: <ExpensesPage />,
    layout: 'App',
    roles: ROLES,
  },
  {
    path: ROUTES_NAME.expenses.print,
    element: <PrintPage />,
    layout: 'Print',
    roles: [ADMIN_R, REGISTRAR_R, COUNTER_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.expenses.detail,
    element: <DetailPage />,
    layout: 'App',
    roles: [ADMIN_R, INSURER_R, COUNTER_R],
  },
  {
    path: ROUTES_NAME.expenses.add,
    element: <AddPage />,
    layout: 'App',
    roles: [ADMIN_R, INSURER_R, COUNTER_R],
  },
];
