import { RolesType } from 'models';
import { UserInsurance } from './userInsurance';

export type UserByRoleResponse = UserInsurance[];
export type UserByRoleParams = {
  contract?: string | number;
  role?: RolesType;
};
