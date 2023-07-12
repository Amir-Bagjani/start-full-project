import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { FolderExpenseParams, FolderExpenseResponse } from 'services/models';

type Data = FolderExpenseResponse;
type Params = FolderExpenseParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const EXPENSE_FOLDERS = 'EXPENSE_FOLDERS';

export const useExpenseFoldersAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSE_FOLDERS, params],
    queryFn: ({ signal }) => APIs.folder.getFolders(params, signal),
    ...options,
  });
};
