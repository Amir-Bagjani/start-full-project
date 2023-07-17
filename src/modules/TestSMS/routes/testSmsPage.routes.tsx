import { lazy } from 'react';

//utils
import { ADMIN_R } from 'utils/constants';
import { ROUTES_NAME } from 'routes/routesName';

//types
import { CustomRouteObject } from 'models';

const TestSms = lazy(() => import(/* webpackPrefetch: true */ '../pages/TestSms'));

export const testSmsPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.testSms,
    element: <TestSms />,
    layout: 'App',
    roles: [ADMIN_R],
  },
];
