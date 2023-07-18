import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ChangeExpenseStatusParams, ChangeExpenseStatusResponse } from 'services/models';

type Data = ChangeExpenseStatusResponse;
type Params = ChangeExpenseStatusParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useChangeExpenseStatusAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.chnageExpenseStatus(params),
    ...options,
  });
};
