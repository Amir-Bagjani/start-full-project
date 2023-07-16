import { ExpenseType } from './expense';

export type InsuredExpenseHistoryResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: InsuredExpenseHistoryType[] | [];
};

export type InsuredExpenseHistoryParams = {
  insured: number;
  dependant?: number;
  date?: string;
  topic?: number;
  page: number;
};

export type InsuredExpenseHistoryType = Omit<
  ExpenseType,
  'cansendexpense' | 'caneditexpense' | 'candeleteexpense' | 'created_by'
> & {
  created_by: number;
};
