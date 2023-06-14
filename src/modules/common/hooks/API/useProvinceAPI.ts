import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { APIError } from 'models/APImodels';

import { APIs } from 'services/APIs';
import { ProvinceTypeResponse } from 'services/models';

export const PROVINCES = 'PROVINCES';

type Data = ProvinceTypeResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const useProvinceAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [PROVINCES],
    queryFn: () => APIs.base.getProvince(params),
    ...options,
  });
};
