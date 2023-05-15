import { CustomRouteObject } from 'models';

import { homePageRoutes } from 'modules/Home/routes/homepage.routes';
import { loginPageRoutes } from 'modules/Login/routes/loginPage.routes';
import { notFoundPageRoutes } from 'modules/NotFound/routes/notFound.routes';
import { dashboardPageRoutes } from 'modules/Dashboard/routes/dashboardPage.routes';

export const APPLICATION_ROUTES: CustomRouteObject[] = [
  ...homePageRoutes,
  ...loginPageRoutes,
  ...dashboardPageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];
