import { useMutation } from '@tanstack/react-query';

//utils
import { APIs } from 'services/APIs';

//types
import type { APIError } from 'models/APImodels';
import type { UseMutationOptions } from '@tanstack/react-query';
import type { RefreshTokenParams, RefreshTokenResponse } from 'services/models';

type Data = RefreshTokenResponse;
type Params = RefreshTokenParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useRefreshTokenAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.api.postResetPass(params),
    ...options,
  });
};
