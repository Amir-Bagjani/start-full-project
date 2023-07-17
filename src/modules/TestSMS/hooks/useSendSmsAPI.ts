import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { SendSmsParams, SendSmsResponse } from 'services/models';

type Data = SendSmsResponse;
type Params = SendSmsParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useSendSmsAPI = (options: Options = {}) =>
  useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.base.sendSMS(params),
    ...options,
  });
