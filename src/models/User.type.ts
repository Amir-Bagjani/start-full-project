import { RolesType } from './ROLES.type';

export type User = {
  refresh: string;
  access: string;
  ExpenseRegistrationIsAllowed: boolean;
  ComplaintRegistrationIsAllowed: boolean;
  ComplaintRegistrationIsAllowedForOtherInsurances: boolean;
  UserHasActiveContract: boolean;
  username: string;
  role: RolesType;
  id: number;
  first_name: string;
  last_name: string;
};
