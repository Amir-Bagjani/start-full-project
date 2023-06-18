import { Override } from 'theme/models';
import { UserInsurance } from '../user';
import { RolesType } from 'models';

type UserType = Override<
  UserInsurance,
  {
    profile: Override<
      UserInsurance['profile'],
      {
        computer_code: string | null;
        image: string | null;
        role: RolesType;
        address: string | null;
        user: number;
        province: number;
        city: number;
      }
    >;
  }
>;

export type LogExpenseResponse = {
  id: number;
  user: UserType;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  title: string;
  status: string;
  level: number;
  expense: number;
}[];

export type LogExpenseParams = {
  expense: number;
};
