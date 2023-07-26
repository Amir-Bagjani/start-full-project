import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { AggregationTransferListParams, AggregationTransferListResponse } from 'services/models';

type Data = AggregationTransferListResponse;
type Params = AggregationTransferListParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const AGGREGATION_TRANSFER = 'AGGREGATION_TRANSFER';

export const useAggregationTransferAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [AGGREGATION_TRANSFER, params],
    queryFn: ({ signal }) => APIs.transferList.getAggregationTransferList(params, signal),
    ...options,
  });
};
