import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ActionExpenseParams, ActionExpenseResponse } from 'services/models';

type Data = ActionExpenseResponse;
type Params = ActionExpenseParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useAddActionExpenseAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.actionExpense(params),
    ...options,
  });
};
