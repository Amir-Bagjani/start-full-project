import { CustomRouteObject } from 'models';

// import { testPagesRoute } from 'modules/testPage/testPages.routes';
import { homePageRoutes } from 'modules/Home/routes/homepage.routes';
import { basePageRoutes } from 'modules/Base/routes/basePage.routes';
import { loginPageRoutes } from 'modules/Login/routes/loginPage.routes';
import { notFoundPageRoutes } from 'modules/NotFound/routes/notFound.routes';
import { expensePageRoutes } from 'modules/Expense/routes/expensePage.routes';
import { expenseDetailPageRoutes } from 'modules/ExpenseDetail/routes/expenseDetail.routes';
import { printPageRoutes } from 'modules/Print/routes/printPage.routes';

export const APPLICATION_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,
  ...homePageRoutes,
  ...expensePageRoutes,
  ...basePageRoutes,
  ...expenseDetailPageRoutes,
  ...printPageRoutes,
  // ...testPagesRoute,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];

export const LOGIN_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,

  //notFound should located at the end of LOGIN_ROUTES array list
  ...notFoundPageRoutes,
];
