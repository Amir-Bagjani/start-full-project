import { ExpenseTypeResponse } from '../expense';

export type AggregationTransferListResponse = ExpenseTypeResponse;
export type AggregationTransferListParams = {
  user?: string | number;
  name?: string;
  fdate?: string;
  tdate?: string;
  transfer?: string | number;
  page: number;
  trigger?: number;
};
