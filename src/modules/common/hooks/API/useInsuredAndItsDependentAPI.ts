import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { DependantOfInsuredParams, DependantOfInsuredResponse } from 'services/models';

type Data = DependantOfInsuredResponse;
type Params = DependantOfInsuredParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const INSURED_AND_DEPENDENT = 'INSURED_AND_DEPENDENT';

export const useInsuredAndItsDependentAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [INSURED_AND_DEPENDENT],
    queryFn: ({ signal }) => APIs.expense.getInsuredAndDependent(params, signal),
    ...options,
  });
};
