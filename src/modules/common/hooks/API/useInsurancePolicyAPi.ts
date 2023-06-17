import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { InsurancePlicyParams, InsurancePolicyResponse } from 'services/models';

type Data = InsurancePolicyResponse;
type Params = InsurancePlicyParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const INSURANCE_POLICY = 'INSURANCE_POLICY';

export const useInsurancePolicyAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [INSURANCE_POLICY],
    queryFn: () => APIs.insurancePolicy.getInsurancePolicy(params),
    ...options,
  });
};
