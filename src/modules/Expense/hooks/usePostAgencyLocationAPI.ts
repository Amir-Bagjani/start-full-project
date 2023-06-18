import { APIs } from 'services/APIs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { ChangeAgencyLocationResponse, ChangeAgencyLocationParams } from 'services/models';

type Data = ChangeAgencyLocationResponse;
type Params = ChangeAgencyLocationParams;
type Options = Omit<UseMutationOptions<Data, APIError, Params, unknown>, 'mutationFn'>;

export const usePostAgencyLocationAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => APIs.expense.changeAgencyLocation(params),
    ...options,
  });
};
