import { lazy } from 'react';

//utils
import {
  ADMIN_R,
  EDITOR_R,
  COUNTER_R,
  INSURED_R,
  REPORTER_R,
  ADJUSTER_R,
  REGISTRAR_R,
  LOSSADJUSTER_R,
  RECEIPTIONICT_R,
  SUPERADJUSTER_R,
  TRUSTEDDOCTOR_R,
} from 'utils/constants';
import { ROUTES_NAME } from 'routes/routesName';

//types
import { CustomRouteObject } from 'models';

const ExpenseDetailPage = lazy(
  () => import(/* webpackPrefetch: true */ '../pages/ExpenseDetailPage' as string),
);

export const expenseDetailPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expense.detail,
    element: <ExpenseDetailPage />,
    layout: 'App',
    roles: [
      ADMIN_R,
      LOSSADJUSTER_R,
      INSURED_R,
      REGISTRAR_R,
      COUNTER_R,
      EDITOR_R,
      REPORTER_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      TRUSTEDDOCTOR_R,
      RECEIPTIONICT_R,
    ],
  },
];
