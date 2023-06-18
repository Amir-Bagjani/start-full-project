import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { DeleteEvaluationAdjustmentParams } from 'services/models';

type Data = {};
type Params = DeleteEvaluationAdjustmentParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const useDeleteEvaluationAdjustmentAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.deleteEvaluationAdjustment(params),
    ...options,
  });
};
