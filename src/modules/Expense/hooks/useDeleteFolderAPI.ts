import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { DeleteFolderExpenseParams } from 'services/models';

type Data = {};
type Params = DeleteFolderExpenseParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useDeleteFolderAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.folder.deleteFolder(params),
    ...options,
  });
};
