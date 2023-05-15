export type Admin = 'admin';
export type Insurer = 'insurer';
export type Insured = 'insured';
export type Adjuster = 'adjuster';
export type Superadjuster = 'superadjuster';
export type Registrar = 'registrar';
export type Organization = 'organization';
export type Company = 'company';
export type Counter = 'counter';
export type Receiptionict = 'receiptionict';
export type Editor = 'editor';
export type Lossadjuster = 'lossadjuster';
export type Trusteddoctor = 'trusteddoctor';
export type Reporter = 'reporter';

export type AdminPersian = 'ادمین';
export type InsurerPersian = 'بیمه گر';
export type InsuredPersian = 'بیمه شده';
export type AdjusterPersian = 'کارشناس';
export type SuperadjusterPersian = 'کارشناس ارشد';
export type RegistrarPersian = 'ثبات';
export type OrganizationPersian = 'سازمان';
export type CompanyPersian = 'شرکت';
export type CounterPersian = 'پیشخوان';
export type ReceiptionictPersian = 'تحویل دار- ارسال به مالی';
export type EditorPersian = 'مدیر';
export type LossadjusterPersian = 'ارزیاب خسارت';
export type TrusteddoctorPersian = 'پزشک معتمد';
export type ReporterPersian = 'گزارشگیر';

export type RolesType =
  | Admin
  | Insurer
  | Insured
  | Adjuster
  | Superadjuster
  | Registrar
  | Organization
  | Company
  | Counter
  | Receiptionict
  | Editor
  | Lossadjuster
  | Trusteddoctor
  | Reporter;

export type Roles = {
  admin: Admin;
  insurer: Insurer;
  insured: Insured;
  adjuster: Adjuster;
  superadjuster: Superadjuster;
  registrar: Registrar;
  organization: Organization;
  company: Company;
  counter: Counter;
  receiptionict: Receiptionict;
  editor: Editor;
  lossadjuster: Lossadjuster;
  trusteddoctor: Trusteddoctor;
  reporter: Reporter;
};

export type RolesPersian = {
  admin: AdminPersian;
  insurer: InsurerPersian;
  insured: InsuredPersian;
  adjuster: AdjusterPersian;
  superadjuster: SuperadjusterPersian;
  registrar: RegistrarPersian;
  organization: OrganizationPersian;
  company: CompanyPersian;
  counter: CounterPersian;
  receiptionict: ReceiptionictPersian;
  editor: EditorPersian;
  lossadjuster: LossadjusterPersian;
  trusteddoctor: TrusteddoctorPersian;
  reporter: ReporterPersian;
};
