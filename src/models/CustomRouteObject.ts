import { RolesType } from './ROLES.type';
import { RouteObject } from 'react-router-dom';
import { User } from './User.type';

export type CustomRouteObject = RouteObject & {
  layout: 'Print' | 'App' | 'Login';
  roles: RolesType[];
  extrCheck?: (user: User) => boolean;
};
