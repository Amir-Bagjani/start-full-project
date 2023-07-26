import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { EditTransferListParams, EditTransferListResponse } from 'services/models';

type Data = EditTransferListResponse;
type Params = EditTransferListParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useEditTransferAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.transferList.editTransfer(params),
    ...options,
  });
};
