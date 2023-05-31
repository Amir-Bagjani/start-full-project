import { lazy } from 'react';
import { ADMIN_R } from 'utils/constants';
import { CustomRouteObject } from 'models';
import { ROUTES_NAME } from 'routes/routesName';

const BasePage = lazy(() => import(/* webpackPrefetch: true */ '../pages/BasePage'));

export const basePageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.base.base,
    element: <BasePage />,
    layout: 'App',
    roles: [ADMIN_R],
  },
];
