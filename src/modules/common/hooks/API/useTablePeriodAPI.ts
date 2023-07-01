import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { KtableParams, KtableResponse } from 'services/models';

type Data = KtableResponse;
type Params = KtableParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const TABLE_PERIOD = 'TABLE_PERIOD';

export const useTablePeriodAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [TABLE_PERIOD, params],
    queryFn: ({ signal }) => APIs.relativeValuePeriod.getTablePeriod(params, signal),
    ...options,
  });
};
