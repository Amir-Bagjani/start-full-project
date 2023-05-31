export const baseRoute = '';
export const baseExpense = baseRoute + '/expense';
export const baseComplaint = baseRoute + '/complaint';
export const baseContract = baseRoute + '/contract';

export const ROUTES_NAME = {
  home: baseRoute,
  notFound: baseRoute + '/not-found',
  dashboard: baseRoute + '/dashboard',
  login: baseRoute + '/login',
  adjuster: baseRoute + '/adjuster',
  superadjuster: baseRoute + '/superadjuster',
  insured: baseRoute + '/insured',
  insurer: baseRoute + '/insurer',
  registrar: baseRoute + '/registrar',
  counter: baseRoute + '/counter',
  receiptionict: baseRoute + '/receiptionict',
  admin: baseRoute + '/admin',
  lossadjuster: baseRoute + '/lossadjuster',
  trustedDoctor: baseRoute + '/trusted-doctor',
  reporter: baseRoute + '/reporter',
  transfer: baseRoute + '/transfer',
  ticket: baseRoute + '/ticket',
  damage: baseRoute + '/damage',
  base: '/base',
  help: '/help',
  report: '/report',
  importFile: '/import-file',
  profile: '/profile',
  expense: {
    base: baseExpense,
    dashboard: baseExpense + '/dashboard',
    costgroup: baseExpense + '/costgroup',
    kperiod: baseExpense + '/kperiod',
    expensetype: baseExpense + '/expensetype',
    expensestatus: baseExpense + '/expensestatus',
    costcentertype: baseExpense + '/costcentertype',
    sampledescription: baseExpense + '/sampledescription',
    expensedocumenttype: baseExpense + '/expensedocumenttype',

    add: baseExpense + '/add',
    detail: baseExpense + '/:id',
    print: baseExpense + '/print/:ids',

    navigateToDetail: (id: number) => `${baseRoute}/expenses/${id}`,
    navigateToPrint: (ids: number[]) => `${baseRoute}/expenses/print/${ids}`,
  },
  contract: {
    base: baseContract,
  },
  complaint: {
    base: baseComplaint,
    add: `${baseComplaint}/add`,
  },
};
