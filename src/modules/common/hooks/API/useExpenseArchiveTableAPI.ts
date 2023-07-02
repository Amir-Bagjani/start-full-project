import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ExpenseArchivedTypeParams, ExpenseArchivedTypeResponse } from 'services/models';

type Data = ExpenseArchivedTypeResponse;
type Params = ExpenseArchivedTypeParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const ARCHIVE_TABLE = 'ARCHIVE_TABLE';

export const useExpenseArchiveTableAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [ARCHIVE_TABLE, params],
    queryFn: ({ signal }) => APIs.expense.getArchiveTable(params, signal),
    ...options,
  });
};
