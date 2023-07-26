import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { AddTransferListParams, AddTransferListResponse } from 'services/models';

type Data = AddTransferListResponse;
type Params = AddTransferListParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useAddTransferAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.transferList.addTransfer(params),
    ...options,
  });
};
