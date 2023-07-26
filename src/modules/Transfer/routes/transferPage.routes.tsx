import { lazy } from 'react';

//utils
import { ROUTES_NAME } from 'routes/routesName';
import { ADMIN_R, RECEIPTIONICT_R } from 'utils/constants';

//types
import { CustomRouteObject } from 'models';

const TransferPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/TransferPage'));

export const transferPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.transfer,
    element: <TransferPage />,
    layout: 'App',
    roles: [ADMIN_R, RECEIPTIONICT_R], //here
  },
];
