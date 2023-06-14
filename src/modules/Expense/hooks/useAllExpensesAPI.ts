import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ExpenseTypeParams, ExpenseTypeResponse } from 'services/models';

type Data = ExpenseTypeResponse;
type Params = ExpenseTypeParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const ALL_EXPENSES = 'ALL_EXPENSES';

export const useAllExpensesAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [ALL_EXPENSES, params],
    queryFn: () => APIs.expense.getAllExpenses(params),
    ...options,
  });
};
