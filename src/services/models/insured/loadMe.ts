import { Dependant, UserInsurance } from '../user';

export type InsuredResponse = {
  id: number;
  user: UserInsurance;
  dependants: Dependant[];
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  computer_code: null | string;
  company: null | string;
};
