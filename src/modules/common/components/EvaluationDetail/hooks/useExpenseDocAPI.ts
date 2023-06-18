import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ExpenseDocParams, ExpenseDocResponse } from 'services/models';

type Data = ExpenseDocResponse;
type Params = ExpenseDocParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const EXPENSE_DOC = 'EXPENSE_DOC';

export const useExpenseDocAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSE_DOC, params],
    queryFn: () => APIs.expense.getExpenseDoc(params),
    ...options,
  });
};
