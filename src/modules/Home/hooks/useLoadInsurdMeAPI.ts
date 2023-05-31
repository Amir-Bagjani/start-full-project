import { useQuery } from '@tanstack/react-query';

//utils
import { APIs } from 'services/APIs';

//types
import type { APIError } from 'models/APImodels';
import { InsuredResponse } from 'services/models';
import type { UseQueryOptions } from '@tanstack/react-query';

type Param = {};
type Data = InsuredResponse;
type Options = Omit<UseQueryOptions<Data, APIError>, 'queryKey' | 'queryFn'>;

export const INSURED_ME = 'INSURED_ME';

export const useLoadInsurdMeAPI = (params: Param = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [INSURED_ME, params],
    queryFn: () => APIs.insured.loadInsuredMe(),
    ...options,
  });
};
