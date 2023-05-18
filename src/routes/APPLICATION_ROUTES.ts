import { CustomRouteObject } from 'models';

import { homePageRoutes } from 'modules/Home/routes/homepage.routes';
import { loginPageRoutes } from 'modules/Login/routes/loginPage.routes';
import { notFoundPageRoutes } from 'modules/NotFound/routes/notFound.routes';
import { dashboardPageRoutes } from 'modules/Dashboard/routes/dashboardPage.routes';
import { expensePageRoutes } from 'modules/expenses/routes/expensePage.routes';

export const APPLICATION_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,
  ...homePageRoutes,
  ...dashboardPageRoutes,
  ...expensePageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];

export const LOGIN_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];
