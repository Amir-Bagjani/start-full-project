import { AxiosHandler } from 'services/utils';
import { convertValuesToString } from 'utils/helper';

//types
import { APIError } from 'models/APImodels';
import { UserByRoleParams, UserByRoleResponse } from 'services/models';

class RoleAndUsersAPI {
  getRoles = async (config: any) => {
    return await AxiosHandler.get('/darman/roles/', config);
  };

  getUsersByRole = async (params: UserByRoleParams, signal?: AbortSignal) => {
    const { role, contract } = params;

    const add_params = {
      ...(!!role && { role }),
      ...(!!contract && { contract }),
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<UserByRoleResponse, APIError>(`/darman/users?${new_params}`, {
      signal,
    });
  };
}

export const roleAndUsers = new RoleAndUsersAPI();
