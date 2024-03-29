import { TopicType } from './topic';
import { Override } from 'theme/models';
import { InsuredType } from '../insured';
import { TypeExpenseType } from './expenseType';
import { Dependant, UserInsurance } from '../user';
import { ExpenseStatusType } from './expenseStatus';
import { DeliveryAgencyType } from './deliveryAgency';
import { TypeCostCenterType } from './costCenterType';
import { EvaluationDetailType } from '../evaluationDetail';

//expense type in expense list
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
  reject_date: string | null;
  reject_reason: string | null;
  reject_by: string | null;
  adjusteditem: string | null;
  adjustername: string | null;
};

//expense type in detail(single Expense)
export type SingleExpenseDetailType = Omit<
  ExpenseType,
  'contract' | 'adjusteditem' | 'adjustername'
> & {
  expense_adjusts: EvaluationDetailType[];
  related_expenses_cnt: number;
  contract: SingleExpenseContact;
};

export type ExpenseArchivedType = ExpenseType;

export type ExpenseTypeResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExpenseType[] | [];
};

export type SingleExpenseDetailResponse = SingleExpenseDetailType;

export type ExpenseArchivedTypeResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExpenseArchivedType[] | [];
};

export type ExpenseTypeParams = {
  page: number;
  filter: Omit<ExpenseParams, 'page' | 'transfer' | 'mode'>;
  transfer?: ExpenseParams['transfer'];
  mode?: ExpenseParams['mode'];
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
    amount?: string | number;
    dependant?: string | number | null;
    date?: string;
    topic?: number | string;
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
  topic?: number | string;
  has_transfer?: Exclude<string, 'true' | 'false'>;
  contract?: number | string;
};

export type SingleExpenseDetailParams = {
  expenseId: number;
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

//print
export type PrintExpenseResponse = ExpenseType[];

export type PrintExpenseParams = {
  expenseIds: number | number[];
};

export type PrintExpenseExtraDataResponse = PrintExpenseExtraDataType[];

export type PrintExpenseExtraDataParams = {
  expenseIds: number | number[];
};

//utils type
type SingleExpenseContact = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  computer_code: string;
  insurer: number;
  organization: number;
  company: number;
  contract_type: number;
  in_contract_register_deadline: number;
  after_contract_register_deadline: number;
};

export type PrintExpenseExtraDataType = {
  id: number;
  insurer: string;
  organization: string;
  franchise: number;
  professinal_technical_cost: number | null;
  contract_strat_date: string;
  contract_end_date: string;
  baseinsurance_amount: number;
  insurancepolicy_name: string | null;
};
