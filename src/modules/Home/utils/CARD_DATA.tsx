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
  SUPERADJUSTER_R,
  LOSSADJUSTER_R,
  TRUSTEDDOCTOR_R,
} from 'utils/constants';
import { ROUTES_NAME } from 'routes/routesName';

//types
import { RolesType } from 'models';

export type CardData = {
  hide: boolean;
  path: string;
  label: string;
  key: keyof typeof CARD_DATA_KEY;
  iconUrl: ReactNode;
  roles: RolesType[];
};

export const CARD_DATA_KEY = {
  expense: 'expense',
  addExpense: 'addExpense',
  contract: 'contract',
  adjuster: 'adjuster',
  superAadjuster: 'superAadjuster',
  insured: 'insured',
  insurer: 'insurer',
  registrar: 'registrar',
  counter: 'counter',
  receiptionict: 'receiptionict',
  admin: 'admin',
  lossAdjuster: 'lossAdjuster',
  trustedDoctor: 'trustedDoctor',
  reporter: 'reporter',
  transferList: 'transferList',
  complaint: 'complaint',
  addComplaint: 'addComplaint',
  support: 'support',
  studentDamage: 'studentDamage',
  dashboard: 'dashboard',
} as const;

export const CARD_DATA: CardData[] = [
  {
    hide: false,
    path: ROUTES_NAME.expense.base,
    label: t('TrackExpense'), //'پیگیری هزینه'
    iconUrl: <ExpenseCardIcon />,
    key: CARD_DATA_KEY.expense,
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
  },
  {
    hide: false,
    path: ROUTES_NAME.expense.add,
    label: t('AddNewExpense'), //"افزودن هزینه جدید"
    key: CARD_DATA_KEY.addExpense,
    iconUrl: <AddExpenseCardIcon />,
    roles: [COUNTER_R, INSURED_R],
  },
  {
    hide: false,
    path: 'contract',
    label: t('Contract'), // "قرارداد"
    key: CARD_DATA_KEY.contract,
    iconUrl: <ContractCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.adjuster,
    label: t('Adjuster'), // 'کارشناس'
    key: CARD_DATA_KEY.adjuster,
    iconUrl: <AdjusterCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.superadjuster,
    label: t('SuperAdjuster'), // "کارشناس ارشد"
    key: CARD_DATA_KEY.superAadjuster,
    iconUrl: <SuperadjusterCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.insured,
    label: t('Insured'), // 'ّیمه شده'
    key: CARD_DATA_KEY.insured,
    iconUrl: <InsuredCardIcon />,
    roles: [ADMIN_R, EDITOR_R, INSURER_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.insurer,
    label: t('Insurer'), //" بیمه گر",
    key: CARD_DATA_KEY.insurer,
    iconUrl: <InsurerCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.registrar,
    label: t('Registrar'), //"ثبّات",
    key: CARD_DATA_KEY.registrar,
    iconUrl: <RegistrarCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.counter,
    label: t('Counter'), //"پیشخوان",
    key: CARD_DATA_KEY.counter,
    iconUrl: <CounterCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.receiptionict,
    label: t('Receiptionict'), //"ارسال به مالی",
    key: CARD_DATA_KEY.receiptionict,
    iconUrl: <FinancialCardIcon />,
    roles: [ADMIN_R, EDITOR_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.admin,
    label: t('Admin'), //"مدیر سیستم",
    key: CARD_DATA_KEY.admin,
    iconUrl: <EditorCardIcon />,
    roles: [ADMIN_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.lossadjuster,
    label: t('Lossadjuster'), //"ارزیاب خسارت",
    key: CARD_DATA_KEY.lossAdjuster,
    iconUrl: <FragileBrokenCardIcon />,
    roles: [ADMIN_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.trustedDoctor,
    label: t('TrustedDoctor'), //"پزشک معتمد",
    key: CARD_DATA_KEY.trustedDoctor,
    iconUrl: <DoctorCardIcon />,
    roles: [ADMIN_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.reporter,
    label: t('Reporter'), //"گزارش گیر",
    key: CARD_DATA_KEY.receiptionict,
    iconUrl: <ChartMagnifyingGlassCardIcon />,
    roles: [ADMIN_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.transfer,
    label: t('TransferList'), //'لیست ارسالی ها',
    key: CARD_DATA_KEY.transferList,
    iconUrl: <TransferCardIcon />,
    roles: [ADMIN_R, RECEIPTIONICT_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.complaint.base,
    label: t('Complaint'), //"شکایات",
    key: CARD_DATA_KEY.complaint,
    iconUrl: <ComplaintCardIcon />,
    roles: [
      ADMIN_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      LOSSADJUSTER_R,
      TRUSTEDDOCTOR_R,
      EDITOR_R,
      INSURED_R,
    ],
  },
  {
    hide: false,
    path: ROUTES_NAME.complaint.add,
    label: t('AddNewComplaint'), //"افزودن شکایت جدید",
    key: CARD_DATA_KEY.addComplaint,
    iconUrl: <AddExpenseCardIcon />,
    roles: [INSURED_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.ticket,
    label: t('Ticket'), //"پشتیبانی",
    key: CARD_DATA_KEY.support,
    iconUrl: <CustomerserviceCardIcon />,
    roles: [ADMIN_R],
  },
  {
    hide: false,
    path: ROUTES_NAME.damage,
    label: t('StudentDamage'), //"حوادث دانش آموزی",
    key: CARD_DATA_KEY.studentDamage,
    iconUrl: <DamageCardIcon />,
    roles: [ADMIN_R, ADJUSTER_R, SUPERADJUSTER_R, LOSSADJUSTER_R, TRUSTEDDOCTOR_R],
  },
  {
    hide: false,
    path: 'dashboard',
    label: t('HomeDashboard'), //"داشبورد",
    key: CARD_DATA_KEY.dashboard,
    iconUrl: <AdmindashboardCardIcon />,
    roles: [ADMIN_R, REPORTER_R],
  },
];
