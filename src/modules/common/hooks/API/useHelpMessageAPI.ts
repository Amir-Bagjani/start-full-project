import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { HelpMessageParams, HelpMessageResponse } from 'services/models/base';

type Data = HelpMessageResponse;
type Params = HelpMessageParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const HELP_MESSAGE = 'HELP_MESSAGE';

export const useHelpMessageAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [HELP_MESSAGE, params],
    queryFn: () => APIs.base.getHelpMessage(params),
    ...options,
  });
};
