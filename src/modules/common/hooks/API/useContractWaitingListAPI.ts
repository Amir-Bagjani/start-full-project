import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ContractWaitingListParams, ContractWaitingListResponse } from 'services/models';

type Data = ContractWaitingListResponse;
type Params = ContractWaitingListParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const WAITING_PERIOD = 'WAITING_PERIOD';

export const useContractWaitingListAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [WAITING_PERIOD, params],
    queryFn: ({ signal }) => APIs.contract.getContractWaitingPeriod(params, signal),
    ...options,
  });
};
