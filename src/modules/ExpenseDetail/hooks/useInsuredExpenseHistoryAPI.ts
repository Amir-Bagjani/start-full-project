import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { InsuredExpenseHistoryParams, InsuredExpenseHistoryResponse } from 'services/models';

type Data = InsuredExpenseHistoryResponse;
type Params = InsuredExpenseHistoryParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const INSURED_EXPENSE_HISTORY = 'INSURED_EXPENSE_HISTORY';

export const useInsuredExpenseHistoryAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [INSURED_EXPENSE_HISTORY, params],
    queryFn: () => APIs.expense.getInsuredExpenseHistory(params),
    ...options,
  });
};
