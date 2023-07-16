import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { PrintExpenseParams, PrintExpenseResponse } from 'services/models';

type Data = PrintExpenseResponse;
type Params = PrintExpenseParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const PRINT_EXPENSES = 'PRINT_EXPENSES';

export const usePrintExpensesAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [PRINT_EXPENSES, params],
    queryFn: ({ signal }) => APIs.expense.getPrintexpenses(params, signal),
    ...options,
  });
};
