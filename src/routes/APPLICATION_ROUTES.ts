import { CustomRouteObject } from 'models';

import { homePageRoutes } from 'modules/Home/routes/homepage.routes';
import { basePageRoutes } from 'modules/Base/routes/basePage.routes';
import { loginPageRoutes } from 'modules/Login/routes/loginPage.routes';
import { notFoundPageRoutes } from 'modules/NotFound/routes/notFound.routes';
import { expensePageRoutes } from 'modules/Expense/routes/expensePage.routes';
// import { testPagesRoute } from 'modules/testPage/testPages.route';

export const APPLICATION_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,
  ...homePageRoutes,
  ...expensePageRoutes,
  ...basePageRoutes,
  // ...testPagesRoute,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];

export const LOGIN_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];
