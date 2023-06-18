import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { LogExpenseParams, LogExpenseResponse } from 'services/models';

type Data = LogExpenseResponse;
type Params = LogExpenseParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const LOG_EXPENSE_STATUS = 'LOG_EXPENSE_STATUS';

export const useLogExpenseStatusAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [LOG_EXPENSE_STATUS, params],
    queryFn: () => APIs.expense.getLogExpense(params),
    ...options,
  });
};
