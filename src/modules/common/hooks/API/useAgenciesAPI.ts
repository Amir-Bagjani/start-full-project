import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { AgenciesParams, AgenciesResponse } from 'services/models';

type Data = AgenciesResponse;
type Params = AgenciesParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const AGENCIES = 'AGENCIES';

export const useAgenciesAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [AGENCIES, params],
    queryFn: () => APIs.base.getAgency(params),
    ...options,
  });
};
