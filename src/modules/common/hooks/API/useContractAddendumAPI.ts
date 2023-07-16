import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ContractAddendumParams, ContractAddendumResponse } from 'services/models';

type Data = ContractAddendumResponse;
type Params = ContractAddendumParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const ADDENDUM = 'ADDENDUM';

export const useContractAddendumAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [ADDENDUM, params],
    queryFn: () => APIs.contract.getContractAddendum(params),
    ...options,
  });
};
