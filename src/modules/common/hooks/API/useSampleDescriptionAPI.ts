import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import type { APIError } from 'models/APImodels';
import { SampleDescriptionParams, SampleDescriptionResponse } from 'services/models';

type Data = SampleDescriptionResponse;
type Params = SampleDescriptionParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const SAMPLE_DESCRIPTION = 'SAMPLE_DESCRIPTION';

export const useSampleDescriptionAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [SAMPLE_DESCRIPTION, params],
    queryFn: () => APIs.expense.getSampleDescription(params),
    ...options,
  });
};
