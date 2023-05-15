import type {
  Roles,
  RolesPersian,
  RolesType,
  Admin,
  Insurer,
  Insured,
  Adjuster,
  Superadjuster,
  Registrar,
  Organization,
  Company,
  Counter,
  Receiptionict,
  Editor,
  Lossadjuster,
  Trusteddoctor,
  Reporter,
} from 'models';

export const ADMIN_R: Admin = 'admin';
export const INSURER_R: Insurer = 'insurer';
export const INSURED_R: Insured = 'insured';
export const ADJUSTER_R: Adjuster = 'adjuster';
export const SUPERADJUSTER_R: Superadjuster = 'superadjuster';
export const REGISTRAR_R: Registrar = 'registrar';
export const ORGANIZATION_R: Organization = 'organization';
export const COMPANY_R: Company = 'company';
export const COUNTER_R: Counter = 'counter';
export const RECEIPTIONICT_R: Receiptionict = 'receiptionict';
export const EDITOR_R: Editor = 'editor';
export const LOSSADJUSTER_R: Lossadjuster = 'lossadjuster';
export const TRUSTEDDOCTOR_R: Trusteddoctor = 'trusteddoctor';
export const REPORTER_R: Reporter = 'reporter';

export const ROLES = [
  ADMIN_R,
  INSURER_R,
  INSURED_R,
  ADJUSTER_R,
  SUPERADJUSTER_R,
  REGISTRAR_R,
  ORGANIZATION_R,
  COMPANY_R,
  COUNTER_R,
  RECEIPTIONICT_R,
  EDITOR_R,
  LOSSADJUSTER_R,
  TRUSTEDDOCTOR_R,
  REPORTER_R,
] satisfies RolesType[];

export const ROLESMap = {
  admin: ADMIN_R,
  insurer: INSURER_R,
  insured: INSURED_R,
  adjuster: ADJUSTER_R,
  superadjuster: SUPERADJUSTER_R,
  registrar: REGISTRAR_R,
  organization: ORGANIZATION_R,
  company: COMPANY_R,
  counter: COUNTER_R,
  receiptionict: RECEIPTIONICT_R,
  editor: EDITOR_R,
  lossadjuster: LOSSADJUSTER_R,
  trusteddoctor: TRUSTEDDOCTOR_R,
  reporter: REPORTER_R,
} satisfies Roles;

export const PERSIANROLESMAP = {
  admin: 'ادمین',
  insurer: 'بیمه گر',
  insured: 'بیمه شده',
  adjuster: 'کارشناس',
  superadjuster: 'کارشناس ارشد',
  registrar: 'ثبات',
  organization: 'سازمان',
  company: 'شرکت',
  counter: 'پیشخوان',
  receiptionict: 'تحویل دار- ارسال به مالی',
  editor: 'مدیر',
  lossadjuster: 'ارزیاب خسارت',
  trusteddoctor: 'پزشک معتمد',
  reporter: 'گزارشگیر',
} satisfies RolesPersian;
