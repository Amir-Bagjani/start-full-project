import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { CostCenterResponse } from 'services/models';

type Data = CostCenterResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const COST_CENTER_TYPE = 'COST_CENTER_TYPE';

export const useCostCenterTypeAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [COST_CENTER_TYPE],
    queryFn: () => APIs.expense.getAllCostCenterType(params),
    ...options,
  });
};
