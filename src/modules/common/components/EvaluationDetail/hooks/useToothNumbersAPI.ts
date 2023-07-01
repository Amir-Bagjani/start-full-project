import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ToothNumberResponse } from 'services/models';

type Data = ToothNumberResponse;
type Params = {};
type Options = Omit<
  UseQueryOptions<Data, APIError, { label: string; value: string }[][]>,
  'queryKey' | 'queryFn'
>;

export const TOOTH_NUMBERS = 'TOOTH_NUMBERS';

export const useToothNumbersAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError, { label: string; value: string }[][]>({
    queryKey: [TOOTH_NUMBERS],
    queryFn: () => APIs.expense.getToothNumbers({}),
    ...options,
  });
};
