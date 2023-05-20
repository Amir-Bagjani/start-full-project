import { AxiosHandler } from 'services/utils';

class BaseAPI {
  getAgency = async (params: any) => {
    const { province, name, city, page = 1 } = params;

    const add_params = {
      ...(!!province && { province }),
      ...(!!name && { name }),
      ...(!!city && { city }),
      page,
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/base/agency/?${new_params}`);
  };

  getProvince = async (params: any) => {
    return await AxiosHandler.get('/base/province/', params);
  };

  getCities = async (params: any) => {
    return await AxiosHandler.get('/base/city/', params);
  };

  getHelpMessage = async (params: any) => {
    return await AxiosHandler.get(`/base/help/message/?query=${params.query}`);
  };
}

export const base = new BaseAPI();
