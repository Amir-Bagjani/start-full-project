import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ContractObligationParams, ContractObligationResponse } from 'services/models';

type Data = ContractObligationResponse;
type Params = ContractObligationParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const OBLIGATIONS = 'OBLIGATIONS';

export const useContractObligationsAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [OBLIGATIONS, params],
    queryFn: () => APIs.contract.getContractObligations(params),
    ...options,
  });
};
