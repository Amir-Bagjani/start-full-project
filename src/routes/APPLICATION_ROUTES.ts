import { CustomRouteObject } from 'models';

import { homePageRoutes } from 'modules/Home/routes/homepage.routes';
import { loginPageRoutes } from 'modules/Login/routes/loginPage.routes';
import { notFoundPageRoutes } from 'modules/NotFound/routes/notFound.routes';

export const APPLICATION_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,
  ...homePageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];

export const LOGIN_ROUTES: CustomRouteObject[] = [
  ...loginPageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];
