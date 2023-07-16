import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { PrintExpenseExtraDataParams, PrintExpenseExtraDataResponse } from 'services/models';

type Data = PrintExpenseExtraDataResponse;
type Params = PrintExpenseExtraDataParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const EXTRA_PRINT_EXPENSE = 'EXTRA_PRINT_EXPENSE';

export const useExtraPrintExpenseAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXTRA_PRINT_EXPENSE, params],
    queryFn: ({ signal }) => APIs.expense.getExtraPrintInfo(params, signal),
    ...options,
  });
};
