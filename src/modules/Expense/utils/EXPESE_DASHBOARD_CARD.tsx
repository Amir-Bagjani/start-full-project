import { t } from 'i18next';
import { ROUTES_NAME } from 'routes/routesName';
import { ExpenseCardIcon } from 'assets/customIcons';

type ExpenseDashboardCard = {
  path: string;
  label: string;
  iconUrl: JSX.Element;
};

export const EXPESE_DASHBOARD_CARD: ExpenseDashboardCard[] = [
  {
    path: ROUTES_NAME.expense.costgroup,
    label: t('ExpenseCostGroup'), //'گروه هزینه',
    iconUrl: <ExpenseCardIcon />,
  },
  {
    path: ROUTES_NAME.expense.kperiod,
    label: t('ExpenseKperiod'), //'دوره های ارزش نسبی',
    iconUrl: <ExpenseCardIcon />,
  },
  {
    path: ROUTES_NAME.expense.expensetype,
    label: t('ExpenseExpType'), //'نوع هزینه',
    iconUrl: <ExpenseCardIcon />,
  },
  {
    path: ROUTES_NAME.expense.expensestatus,
    label: t('ExpenseExpStatus'), //'وضعیت هزینه',
    iconUrl: <ExpenseCardIcon />,
  },
  {
    path: ROUTES_NAME.expense.costcentertype,
    label: t('ExpenseExpCostCenterType'), //'نوع مرکز هزینه',
    iconUrl: <ExpenseCardIcon />,
  },
  {
    path: ROUTES_NAME.expense.sampledescription,
    label: t('ExpenseSampleDesc'), //'متن های پیش فرض',
    iconUrl: <ExpenseCardIcon />,
  },

  {
    path: ROUTES_NAME.expense.expensedocumenttype,
    label: t('ExpenseExpDocType'), //'نوع اسناد هزینه',
    iconUrl: <ExpenseCardIcon />,
  },
];
