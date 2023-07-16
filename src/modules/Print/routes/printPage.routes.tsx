import { lazy } from 'react';

//utils
import { ROUTES_NAME } from 'routes/routesName';
import { ADMIN_R, COUNTER_R, EDITOR_R, REGISTRAR_R } from 'utils/constants';

//types
import { CustomRouteObject } from 'models';

const PrintPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/PrintPage'));

export const printPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expense.print,
    element: <PrintPage />,
    layout: 'Print',
    roles: [ADMIN_R, COUNTER_R, REGISTRAR_R, EDITOR_R],
  },
];
