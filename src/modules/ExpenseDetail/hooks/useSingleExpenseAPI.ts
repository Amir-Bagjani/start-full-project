import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { SingleExpenseDetailParams, SingleExpenseDetailResponse } from 'services/models';

type Data = SingleExpenseDetailResponse;
type Params = SingleExpenseDetailParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const SINGLE_EXPENSE = 'SINGLE_EXPENSE';

export const useSingleExpenseAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [SINGLE_EXPENSE, params],
    queryFn: () => APIs.expense.getSingleExpenses(params),
    ...options,
  });
};
