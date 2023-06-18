import { APIs } from 'services/APIs';
import { useMutation } from '@tanstack/react-query';

export const usePostEvaluationAdjustmentAPI = (options = {}) => {
  return useMutation({
    mutationFn: (params) => APIs.expense.sendEvaluationAdjustment(params),
    ...options,
  });
};
