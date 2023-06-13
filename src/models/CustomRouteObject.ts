import { RouteObject } from 'react-router-dom';

//types
import { User } from './User.type';
import { RolesType } from './ROLES.type';
import { AppLayoutProps } from 'modules/common/components';

export type CustomRouteObject = RouteObject & {
  layout: 'Print' | 'App' | 'Login';
  layoutProps?: AppLayoutProps;
  roles: RolesType[];
  extrCheck?: (user: User) => boolean;
};
