import { AxiosHandler } from 'services/utils';

//utils
import { convertValuesToString } from 'utils/helper';

//types
import {
  CityResponse,
  AgenciesParams,
  AgenciesResponse,
  HelpMessageParams,
  HelpMessageResponse,
  SendSmsResponse,
  SendSmsParams,
} from 'services/models/base';
import { APIError } from 'models/APImodels';
import { ProvinceTypeResponse } from 'services/models';

class BaseAPI {
  getAgency = async (params: AgenciesParams) => {
    const { province, name, city, page = 1 } = params;

    const add_params = {
      ...(!!province && { province }),
      ...(!!name && { name }),
      ...(!!city && { city }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<AgenciesResponse, APIError>(`/base/agency/?${new_params}`);
  };

  getProvince = async (config: {}) => {
    return await AxiosHandler.get<ProvinceTypeResponse, APIError>('/base/province/', config);
  };

  getCities = async (config: {}) => {
    return await AxiosHandler.get<CityResponse, APIError>('/base/city/', config);
  };

  getHelpMessage = async (params: HelpMessageParams) => {
    return await AxiosHandler.get<HelpMessageResponse, APIError>(
      `/base/help/message/?query=${params.query}`,
    );
  };

  sendSMS = async (params: any) => {
    return await AxiosHandler.post<SendSmsResponse, APIError, SendSmsParams>(
      '/base/sms/send',
      params,
    );
  };
}

export const base = new BaseAPI();
