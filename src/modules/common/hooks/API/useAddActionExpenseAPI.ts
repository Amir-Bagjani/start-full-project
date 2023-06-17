import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';

type Data = LoginResponse;
type Params = LoginParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useAddActionExpenseAPI = (options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.actionExpense(params),
    ...options,
  });
};
