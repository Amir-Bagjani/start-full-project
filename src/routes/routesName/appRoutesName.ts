export const baseRoute = '';

export const ROUTES_NAME = {
  home: baseRoute,
  dashboard: baseRoute + '/dashboard',
  login: baseRoute + '/login',
  expenses: {
    base: baseRoute + '/expenses',
    detail: `${baseRoute}/expenses/:id`,
    add: `${baseRoute}/expenses/add`,
    print: `${baseRoute}/expenses/print/:ids`,

    navigateToDetail: (id: number) => `${baseRoute}/expenses/${id}`,
    navigateToPrint: (ids: number[]) => `${baseRoute}/expenses/print/${ids}`,
  },
};
