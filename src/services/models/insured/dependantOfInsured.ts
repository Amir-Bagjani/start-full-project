import { UserInsurance } from '../user';

export type DependantOfInsuredResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DependantOfInsuredType[];
};

export type DependantOfInsuredParams = {
  name: string;
  listtype: 'withdependants';
};

export type DependantOfInsuredType = {
  id: number;
  user: UserInsurance;
  is_active: boolean;
  dependants: {
    id: number;
    first_name: string;
    last_name: string;
    father: string;
    nationalcode: string;
  }[];
  contract: {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    computer_code: string;
    insurer: number;
    organization: number;
    company: number;
    contract_type: number;
    reporters: number[];
  };
};
