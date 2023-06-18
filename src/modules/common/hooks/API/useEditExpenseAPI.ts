import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { EditExpenseParams, EditExpenseResponse } from 'services/models';

type Data = EditExpenseResponse;
type Params = EditExpenseParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useEditExpenseAPI = (options: Options = {}) => {
  return useMutation({
    mutationFn: (params) => APIs.expense.editExpense(params),
    ...options,
  });
};
