import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { UserByRoleParams, UserByRoleResponse } from 'services/models';

type Data = UserByRoleResponse;
type Params = UserByRoleParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const USERS_BY_ROLE = 'USERS_BY_ROLE';

export const useUsersByRoleAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [USERS_BY_ROLE, params],
    queryFn: ({ signal }) => APIs.roleAndUsers.getUsersByRole(params, signal),
    ...options,
  });
};
