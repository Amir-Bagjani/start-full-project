import { t } from 'i18next';
import { ReactNode } from 'react';

//icons
import {
  DamageCardIcon,
  DoctorCardIcon,
  EditorCardIcon,
  ExpenseCardIcon,
  InsuredCardIcon,
  InsurerCardIcon,
  CounterCardIcon,
  TransferCardIcon,
  AdjusterCardIcon,
  ContractCardIcon,
  ComplaintCardIcon,
  RegistrarCardIcon,
  FinancialCardIcon,
  AddExpenseCardIcon,
  SuperadjusterCardIcon,
  FragileBrokenCardIcon,
  AdmindashboardCardIcon,
  CustomerserviceCardIcon,
  ChartMagnifyingGlassCardIcon,
} from 'assets/customIcons';

//utils
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
} from 'utils/constants';
import { ROUTES_NAME } from 'routes/routesName';

//types
import { RolesType } from 'models';

export type CardData = {
  path: string;
  label: string;
  iconUrl: ReactNode;
  roles: RolesType[];
};

export const CARD_DATA: CardData[] = [
  {
    path: ROUTES_NAME.expense.base,
    label: t('TrackExpense'), //'پیگیری هزینه'
    iconUrl: <ExpenseCardIcon />,
    roles: [
      ADMIN_R,
      ADJUSTER_R,
      COUNTER_R,
      EDITOR_R,
      INSURED_R,
      INSURER_R,
      RECEIPTIONICT_R,
      REGISTRAR_R,
      REPORTER_R,
    ],
  },
  {
    path: ROUTES_NAME.expense.add,
    label: t('AddNewExpense'), //"افزودن هزینه جدید"
    iconUrl: <AddExpenseCardIcon />,
    roles: [COUNTER_R, INSURED_R],
  },
  {
    path: 'contract',
    label: t('Contract'), // "قرارداد"
    iconUrl: <ContractCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.adjuster,
    label: t('Adjuster'), // 'کارشناس'
    iconUrl: <AdjusterCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.superadjuster,
    label: t('SuperAdjuster'), // "کارشناس ارشد"
    iconUrl: <SuperadjusterCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.insured,
    label: t('Insured'), // 'ّیمه شده'
    iconUrl: <InsuredCardIcon />,
    roles: [ADMIN_R, EDITOR_R, INSURER_R],
  },
  {
    path: ROUTES_NAME.insurer,
    label: t('Insurer'), //" بیمه گر",
    iconUrl: <InsurerCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.registrar,
    label: t('Registrar'), //"ثبّات",
    iconUrl: <RegistrarCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.counter,
    label: t('Counter'), //"پیشخوان",
    iconUrl: <CounterCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.receiptionict,
    label: t('Receiptionict'), //"ارسال به مالی",
    iconUrl: <FinancialCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    path: ROUTES_NAME.admin,
    label: t('Admin'), //"مدیر سیستم",
    iconUrl: <EditorCardIcon />,
    roles: [ADMIN_R],
  },
  {
    path: ROUTES_NAME.lossadjuster,
    label: t('Lossadjuster'), //"ارزیاب خسارت",
    iconUrl: <FragileBrokenCardIcon />,
    roles: [ADMIN_R],
  },
  {
    path: ROUTES_NAME.trustedDoctor,
    label: t('TrustedDoctor'), //"پزشک معتمد",
    iconUrl: <DoctorCardIcon />,
    roles: [ADMIN_R],
  },
  {
    path: ROUTES_NAME.reporter,
    label: t('Reporter'), //"گزارش گیر",
    iconUrl: <ChartMagnifyingGlassCardIcon />,
    roles: [ADMIN_R],
  },
  {
    path: ROUTES_NAME.transfer,
    label: t('TransferList'), //'لیست ارسالی ها',
    iconUrl: <TransferCardIcon />,
    roles: [ADMIN_R, RECEIPTIONICT_R],
  },
  {
    path: ROUTES_NAME.complaint.base,
    label: t('Complaint'), //"شکایات",
    iconUrl: <ComplaintCardIcon />,
    roles: [ADMIN_R, ADJUSTER_R, EDITOR_R, INSURED_R],
  },
  {
    path: ROUTES_NAME.complaint.add,
    label: t('AddNewComplaint'), //"افزودن شکایت جدید",
    iconUrl: <AddExpenseCardIcon />,
    roles: [INSURED_R],
  },
  {
    path: ROUTES_NAME.ticket,
    label: t('Ticket'), //"پشتیبانی",
    iconUrl: <CustomerserviceCardIcon />,
    roles: [ADMIN_R],
  },
  {
    path: ROUTES_NAME.damage,
    label: t('StudentDamage'), //"حوادث دانش آموزی",
    iconUrl: <DamageCardIcon />,
    roles: [ADMIN_R, ADJUSTER_R],
  },
  {
    path: 'dashboard',
    label: t('HomeDashboard'), //"داشبورد",
    iconUrl: <AdmindashboardCardIcon />,
    roles: [ADMIN_R, REPORTER_R],
  },
];
