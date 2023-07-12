import { TopicType } from './topic';
import { Override } from 'theme/models';
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
  updated_at: string;
  amount: number;
  date: string;
  tracking_code: string;
  description: string | null;
  physical_has_received: boolean;
  delivery_address: string | null;
  contract: number;
  transfer: { id: number; title: string } | null;
  physical_has_received_by: number | null;
  physical_has_received_date: number | null;
};

export type ExpenseArchivedType = ExpenseType;

export type ExpenseTypeResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExpenseType[] | [];
};

export type ExpenseArchivedTypeResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExpenseArchivedType[] | [];
};

export type ExpenseTypeParams = {
  page: number;
  filter: Omit<ExpenseParams, 'page' | 'transfer' | 'mode'>;
  transfer?: Pick<ExpenseParams, 'transfer'>;
  mode?: Pick<ExpenseParams, 'mode'>;
};

export type ExpenseArchivedTypeParams = {
  page: number;
  filter: Omit<ExpenseArchivedParams, 'page'>;
};

export type EditExpenseParams = {
  expenseId: number;
  data: {
    expense_type?: string | number;
    cost_center_type?: string | number;
  };
};

export type EditExpenseResponse = Override<
  ExpenseType,
  {
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
    created_by: number;
  }
>;

export type ExpenseParams = {
  name?: string;
  fdate?: string | null;
  tdate?: string | null;
  mode?: string;
  transfer?: string | number;
  province?: string | number;
  insurancepolicy?: string | number;
  expense_type?: string | number;
  expense_status?: string | number;
  page: number;
};

export type ExpenseArchivedParams = {
  page: number;
  expense?: string | number;
  cost_center_type?: string | number;
  name?: string;
  fdate?: string | null;
  tdate?: string | null;
  expense_status?: string | number;
  expense_type?: string | number;
  province?: string | number;
  expense_status_code?: string | number;
};
