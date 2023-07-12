import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { AddFolderExpenseParams, AddFolderExpenseResponse } from 'services/models';

type Data = AddFolderExpenseResponse;
type Params = AddFolderExpenseParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useAddFolderAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.folder.addFolder(params),
    ...options,
  });
};
