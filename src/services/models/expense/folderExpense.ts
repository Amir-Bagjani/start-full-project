import { Override } from 'theme/models';
import { ExpenseType } from './expense';
import { KtableType } from '../evaluationDetail';

export type FolderExpenseResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FolderExpenseType[] | [];
};
export type FolderExpenseParams = {
  page: number;
  filter: {
    name?: string;
  };
};

export type FolderExpenseType = {
  id: number;
  name: string;
  folder_number: number;
  type: number;
  contract_id: number;
  is_active: boolean;
  created_at: string;
  frist_expense_id: number;
};

//single data
export type SingleFolderExpenseResponse = {
  id: number;
  expenses: ExpenseType & { expense_adjusts: ExpenseAdjustsType[] }[];
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  date: string;
  folder_number: number;
  type: number;
  is_archived: boolean;
  contract: number;
  created_by: number;
};

export type SingleFolderExpenseParams = {
  id: number;
};

//delete
export type DeleteFolderExpenseParams = {
  id: number;
};

//edit
export type EditFolderExpenseParams = {
  id: number;
  data: {
    expenses?: number[];
    name?: string;
    is_archived?: boolean;
  };
};

export type EditFolderExpenseResponse = Override<
  SingleFolderExpenseResponse,
  {
    expenses: number[];
  }
>;

//add folder
export type AddFolderExpenseParams = {
  name: string;
  date: string;
  expenses: number[];
  contract: number;
};

export type AddFolderExpenseResponse = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  date: string;
  folder_number: number;
  type: number;
  is_archived: boolean;
  contract: number;
  created_by: number;
  expenses: number[];
};

//helper types
export type ExpenseAdjustsType = {
  id: number;
  ktable: Override<
    KtableType,
    {
      expense_type: number | null;
    }
  >;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  professinal_technical_cost: number | null;
  ansethesia_professinal_cost: number | null;
  ansethesia_professinal_percent: number;
  extra_percent: number | null;
  has_base_insurance: boolean;
  franchise: number;
  amount: number;
  expense_amount: number;
  fanavan_error: string | null;
  dmg_case_id: string | null;
  tooth_number: string | null;
  number_of_sessions: number;
  deduction: number;
  baseinsurance_amount: number;
  difference_amount: number;
  expense: number;
  adjuster: number | null;
};
