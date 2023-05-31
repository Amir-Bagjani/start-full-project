import { lazy } from 'react';
import { ROLES } from 'utils/constants';
import { CustomRouteObject, RolesType } from 'models';
import { ROUTES_NAME } from 'routes/routesName';
import ExpensePAge from './ExpensePAge';
import AddExpensePage from './AddExpensePage';
import Complaint from './Complaint';
import AddComplaint from './AddComplaint';

import {
  ADMIN_R,
  EDITOR_R,
  INSURED_R,
  INSURER_R,
  COUNTER_R,
  REPORTER_R,
  ADJUSTER_R,
  REGISTRAR_R,
  RECEIPTIONICT_R,
  SUPERADJUSTER_R,
  LOSSADJUSTER_R,
  TRUSTEDDOCTOR_R,
} from 'utils/constants';
import { User } from 'models/User.type';

const ADJUSTERS_ROLES = [
  ADJUSTER_R,
  SUPERADJUSTER_R,
  LOSSADJUSTER_R,
  TRUSTEDDOCTOR_R,
] as RolesType[];

// const HomePage = lazy(() => import(/* webpackPrefetch: true */ '../pages/HomePage'));

export const testPagesRoute: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.expense.base,
    element: <ExpensePAge />,
    layout: 'App',
    roles: [
      ADMIN_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      LOSSADJUSTER_R,
      TRUSTEDDOCTOR_R,
      COUNTER_R,
      EDITOR_R,
      INSURED_R,
      INSURER_R,
      RECEIPTIONICT_R,
      REGISTRAR_R,
      REPORTER_R,
    ],
    extrCheck: (user: User) => {
      if ([...ADJUSTERS_ROLES, INSURED_R].includes(user.role))
        return user.ExpenseRegistrationIsAllowed;
      return true;
    },
  },
  {
    path: ROUTES_NAME.expense.add,
    element: <AddExpensePage />,
    layout: 'App',
    roles: [COUNTER_R, INSURED_R],
    extrCheck: (user: User) => {
      if (user.role === INSURED_R) return user.ExpenseRegistrationIsAllowed;
      return true;
    },
  },
  {
    path: ROUTES_NAME.complaint.base,
    element: <Complaint />,
    layout: 'App',
    roles: [
      ADMIN_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      LOSSADJUSTER_R,
      TRUSTEDDOCTOR_R,
      EDITOR_R,
      INSURED_R,
    ],
    extrCheck: (user: User) => {
      if ([...ADJUSTERS_ROLES, INSURED_R].includes(user.role))
        return user.ComplaintRegistrationIsAllowed;
      return true;
    },
  },
  {
    path: ROUTES_NAME.complaint.add,
    element: <AddComplaint />,
    layout: 'App',
    roles: [INSURED_R],
    extrCheck: (user: User) => {
      if (user.role === INSURED_R) return user.ComplaintRegistrationIsAllowed;
      return true;
    },
  },
];
