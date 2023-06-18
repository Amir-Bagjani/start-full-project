import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { EvaluationDetailParams, EvaluationDetailResponse } from 'services/models';

type Data = EvaluationDetailResponse;
type Params = EvaluationDetailParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const EVALUATION_ADJUST_LIST = 'EVALUATION_ADJUST_LIST';

export const useEvalutionAdjustListAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [EVALUATION_ADJUST_LIST],
    queryFn: () => APIs.expense.getEvaluationAdjustList(params),
    ...options,
  });
};
