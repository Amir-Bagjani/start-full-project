import { Override } from 'theme/models';
import { SingleExpenseDetailType } from '../expense';

//get all transfers list
export type TransfersListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransferType[];
};
export type TransfersListParams = {
  page: number;
};

//add transfer
export type AddTransferListResponse = TransferType;
export type AddTransferListParams = {
  title: string;
  date: string;
  expenses?: number[];
  contract: string | number;
  province: string | number;
  insurance_policy: string | number;
};

//delete transfer
export type DeleteTransferListResponse = {};
export type DeleteTransferListParams = {
  id: number;
};

//edit transfer
export type EditTransferListResponse = TransferType;
export type EditTransferListParams = {
  id: number;
  data: {
    expenses?: number[];
    title?: string;
    date?: string;
    is_archived?: boolean;
    insurance_policy?: number | string;
    added_expense_ids?: number[];
    deleted_expense_ids?: number[];
  };
};

//get single transfer
export type SingleTransferListResponse = Override<
  TransferType,
  {
    expenses: SingleExpenseDetailType[];
    insurance_policy: InsurancePolicyOfTransferType;
  }
>;
export type SingleTransferListParams = {
  id: number;
};

//utils
export type TransferType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  title: string;
  date: string;
  is_archived: boolean;
  doc_acceptance_id: string | null;
  claim_id: string | null;
  draft_id: string | null;
  insurance_policy: number;
  created_by: number;
};

type InsurancePolicyOfTransferType = {
  id: number;
  province: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  policy_number: string;
  computer_code: string;
  use_fanavaran_api: boolean;
  contract_id: number;
};
