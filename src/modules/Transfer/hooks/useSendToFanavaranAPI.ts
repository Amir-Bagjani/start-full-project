import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { SentToFanavaranParams, SentToFanavaranResponse } from 'services/models';

type Data = SentToFanavaranResponse;
type Params = SentToFanavaranParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useSendToFanavaranAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.transferList.sendToFanavaran(params),
    ...options,
  });
};
