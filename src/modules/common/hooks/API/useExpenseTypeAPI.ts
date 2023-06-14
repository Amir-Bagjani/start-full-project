import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { APIs } from 'services/APIs';

import { APIError } from 'models/APImodels';
import { TypeExpenseTypeResponse } from 'services/models';

export const EXPENSE_TYPE = 'EXPENSE_TYPE';

type Data = TypeExpenseTypeResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const useExpenseTypeAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSE_TYPE],
    queryFn: () => APIs.expense.getAllExpenseType({}),
    ...options,
  });
};
