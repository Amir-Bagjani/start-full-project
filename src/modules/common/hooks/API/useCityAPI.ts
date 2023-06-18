import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { CityResponse } from 'services/models';

type Data = CityResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const CITIES = 'CITIES';

export const useCityAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [CITIES],
    queryFn: () => APIs.base.getCities(params),
    ...options,
  });
};
