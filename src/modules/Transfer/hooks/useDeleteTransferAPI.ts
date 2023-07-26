import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { DeleteTransferListParams, DeleteTransferListResponse } from 'services/models';

type Data = DeleteTransferListResponse;
type Params = DeleteTransferListParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useDeleteTransferAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.transferList.deleteFolder(params),
    ...options,
  });
};
