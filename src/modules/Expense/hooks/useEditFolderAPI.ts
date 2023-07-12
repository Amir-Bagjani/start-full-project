import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { EditFolderExpenseParams, EditFolderExpenseResponse } from 'services/models';

type Data = EditFolderExpenseResponse;
type Params = EditFolderExpenseParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useEditFolderAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.folder.editFolder(params),
    ...options,
  });
};
