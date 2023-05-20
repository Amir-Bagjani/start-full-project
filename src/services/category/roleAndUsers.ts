import { AxiosHandler } from 'services/utils';

class RoleAndUsersAPI {
  getRoles = async (config: any) => {
    return await AxiosHandler.get('/darman/roles/', config);
  };

  getUsersByRole = async (params: any) => {
    const { role, contract = 9 } = params; //contract 9 =  آموزش و پرورش

    const add_params = {
      contract,
      ...(!!role && { role }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/users?${new_params}`);
  };
}

export const roleAndUsers = new RoleAndUsersAPI();
