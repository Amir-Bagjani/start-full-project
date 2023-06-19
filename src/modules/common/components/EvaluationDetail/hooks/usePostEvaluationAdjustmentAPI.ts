import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { AddEvaluationAdjustmentParams, AddEvaluationAdjustmentResponse } from 'services/models';

type Data = AddEvaluationAdjustmentResponse;
type Params = AddEvaluationAdjustmentParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const usePostEvaluationAdjustmentAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.sendEvaluationAdjustment(params),
    ...options,
  });
};
