import { lazy } from 'react';

//utils
import { ADMIN_R } from 'utils/constants';
import { ROUTES_NAME } from 'routes/routesName';

//types
import { CustomRouteObject } from 'models';

const ChangeExpenseStatus = lazy(
  () => import(/* webpackPrefetch: true */ '../pages/ChangeExpenseStatus'),
);

export const changeExpenseStatusRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expense.changeStatus,
    element: <ChangeExpenseStatus />,
    layout: 'App',
    roles: [ADMIN_R],
  },
];
