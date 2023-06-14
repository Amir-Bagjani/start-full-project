import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { APIs } from 'services/APIs';

import { APIError } from 'models/APImodels';
import { ExpenseStatusTypeResponse } from 'services/models';

export const EXPENSE_STATUS = 'EXPENSE_STATUS';

type Data = ExpenseStatusTypeResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const useExpenseStatusAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSE_STATUS],
    queryFn: () => APIs.expense.getAllExpenseStatus(params),
    ...options,
  });
};
