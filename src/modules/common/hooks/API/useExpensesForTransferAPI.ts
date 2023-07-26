import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ExpenseTypeParams, ExpenseTypeResponse } from 'services/models';

type Data = ExpenseTypeResponse;
type Params = ExpenseTypeParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const EXPENSES_FOR_TRANSFER = 'EXPENSES_FOR_TRANSFER';

export const useExpensesForTransferAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSES_FOR_TRANSFER, params.page, params.filter],
    queryFn: ({ signal }) => APIs.expense.getAllExpenses(params, signal),
    ...options,
  });
};
