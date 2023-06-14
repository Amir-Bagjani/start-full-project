import { TopicType } from './topic';
import { InsuredType } from '../insured';
import { TypeExpenseType } from './expenseType';
import { Dependant, UserInsurance } from '../user';
import { ExpenseStatusType } from './expenseStatus';
import { DeliveryAgencyType } from './deliveryAgency';
import { TypeCostCenterType } from './costCenterType';

export type ExpenseType = {
  id: number;
  insured: InsuredType;
  expense_status: ExpenseStatusType | null;
  delivery_agency: DeliveryAgencyType | null;
  cost_center_type: TypeCostCenterType | null;
  expense_type: TypeExpenseType | null;
  created_by: UserInsurance;
  topic: TopicType | null;
  dependant: Dependant | null;
  adjustprice: number;
  cansendexpense: boolean;
  caneditexpense: boolean;
  candeleteexpense: boolean;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string | null;
  amount: number;
  date: string | null;
  tracking_code: string;
  description: string | null;
  physical_has_received: boolean;
  delivery_address: string | null;
  contract: number;
  transfer: number | null;
};

export type ExpenseTypeResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExpenseType[] | [];
};

export type ExpenseTypeParams = {
  page: number;
  filter: Omit<ExpenseParams, 'page' | 'transfer' | 'mode'>;
  transfer?: Pick<ExpenseParams, 'transfer'>;
  mode?: Pick<ExpenseParams, 'mode'>;
};

export type ExpenseParams = {
  name?: string;
  fdate?: string | null;
  tdate?: string | null;
  mode?: string;
  transfer?: string | number;
  province?: string | number;
  expense_type?: string | number;
  expense_status?: string | number;
  page: number;
};
