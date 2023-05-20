import { AxiosHandler } from 'services/utils';

class Api {
  postResetPass = async (data: any) => {
    return await AxiosHandler.post('api/resetpass/', data);
  };
}

export const api = new Api();
