import { APIs } from 'services/APIs';
import { useMutation } from '@tanstack/react-query';

export const usePsotCalcExpensePriceAPI = (options = {}) => {
  return useMutation({
    mutationFn: (params) => APIs.expense.calcExpensePrice(params),
    ...options,
  });
};
