import { useMutation } from '@tanstack/react-query';
import { LoginParams, LoginResponse } from 'services/models';

//utils
import { APIs } from 'services/APIs';

//types
import type { APIError } from 'models/APImodels';
import type { UseMutationOptions } from '@tanstack/react-query';

type Data = LoginResponse;
type Params = LoginParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useLoginAPI = (options: Options = {}) =>
  useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.user.login(params),
    ...options,
  });
