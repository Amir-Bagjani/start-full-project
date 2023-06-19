import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { CalcExpensePriceParams, CalcExpensePriceResponse } from 'services/models';

type Data = CalcExpensePriceResponse;
type Params = CalcExpensePriceParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const usePsotCalcExpensePriceAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.calcExpensePrice(params),
    ...options,
  });
};
