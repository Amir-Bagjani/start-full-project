import { RolesType } from './ROLES.type';
import { RouteObject } from 'react-router-dom';

export type CustomRouteObject = RouteObject & {
  layout: 'Print' | 'App' | 'Login';
  roles: RolesType[];
};
