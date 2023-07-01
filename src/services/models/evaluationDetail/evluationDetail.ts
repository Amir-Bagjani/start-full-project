import { KtableType } from './ktable';

export type EvaluationDetailResponse = EvaluationDetailType[];

export type EvaluationDetailParams = {
  expenseId: number;
};

export type DeleteEvaluationAdjustmentParams = {
  id: number;
};

export type AddEvaluationAdjustmentResponse = EvaluationDetailType;

export type AddEvaluationAdjustmentParams = {
  amount: string | number;
  franchise: string | number;
  expense: string | number;
  ktable: string | number;
  expense_amount: string | number;
  number_of_sessions: string | number;
  deduction: string | number;
  has_base_insurance: number;
  comments: string;
  tooth_number: string;
  baseinsurance_amount: number;
  difference_amount: number;
};

export type EvaluationDetailType = {
  id: number;
  ktable: KtableType;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  professinal_technical_cost: number | null;
  ansethesia_professinal_cost: number | null;
  ansethesia_professinal_percent: number;
  extra_percent: number;
  has_base_insurance: boolean;
  franchise: number;
  amount: number;
  expense_amount: number;
  fanavan_error: string | null;
  dmg_case_id: string | null;
  tooth_number: string | null;
  number_of_sessions: number;
  expense: number;
  adjuster: null;
};
