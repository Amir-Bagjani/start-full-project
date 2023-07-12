import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//utils
import { EXPENSE_FOLDERS } from './useExpenseFoldersAPI';

//types
import { APIError } from 'models/APImodels';
import { SingleFolderExpenseParams, SingleFolderExpenseResponse } from 'services/models';

type Data = SingleFolderExpenseResponse;
type Params = SingleFolderExpenseParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const useSingleExpenseFolderAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EXPENSE_FOLDERS, params],
    queryFn: ({ signal }) => APIs.folder.getSingleFolder(params, signal),
    ...options,
  });
};
