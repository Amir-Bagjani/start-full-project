export const baseRoute = '';
export const baseExpense = baseRoute + '/expense';

export const ROUTES_NAME = {
  home: baseRoute,
  dashboard: baseRoute + '/dashboard',
  login: baseRoute + '/login',
  expense: {
    base: baseExpense,
    dashboard: baseExpense + '/dashboard',

    detail: `${baseRoute}/expenses/:id`,
    add: `${baseRoute}/expenses/add`,
    print: `${baseRoute}/expenses/print/:ids`,

    navigateToDetail: (id: number) => `${baseRoute}/expenses/${id}`,
    navigateToPrint: (ids: number[]) => `${baseRoute}/expenses/print/${ids}`,
  },
  base: '/base',
  help: '/help',
  transfer: '/transfer',
  report: '/report',
  importFile: '/import-file',
  profile: '/profile',
};
