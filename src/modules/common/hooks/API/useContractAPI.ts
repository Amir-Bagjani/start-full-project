import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ContractTypeResponse } from 'services/models';

type Data = ContractTypeResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const EXPENSE_CONTRACTS = 'EXPENSE_CONTRACTS';

export const useContractAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSE_CONTRACTS],
    queryFn: ({ signal }) => APIs.folder.getContract({}, signal),
    ...options,
  });
};
