import { AxiosHandler } from 'services/utils';

//types
import { APIError } from 'models/APImodels';
import { RefreshTokenParams, RefreshTokenResponse } from 'services/models';

class Api {
  postResetPass = async (data: RefreshTokenParams) => {
    return await AxiosHandler.post<RefreshTokenResponse, APIError, RefreshTokenParams>(
      'api/resetpass/',
      data,
    );
  };
}

export const api = new Api();
