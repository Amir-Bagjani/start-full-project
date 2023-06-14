import { AxiosHandler } from 'services/utils';

//types
import { APIError } from 'models/APImodels';
import { HelpMessageParams, HelpMessageResponse } from 'services/models/base';
import { ProvinceTypeResponse } from 'services/models';

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

  getProvince = async (config: {}) => {
    return await AxiosHandler.get<ProvinceTypeResponse, APIError>('/base/province/', config);
  };

  getCities = async (params: any) => {
    return await AxiosHandler.get('/base/city/', params);
  };

  getHelpMessage = async (params: HelpMessageParams) => {
    return await AxiosHandler.get<HelpMessageResponse, APIError>(
      `/base/help/message/?query=${params.query}`,
    );
  };
}

export const base = new BaseAPI();
