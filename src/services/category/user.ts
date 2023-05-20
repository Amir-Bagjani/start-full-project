import axios from 'axios';
import { AxiosHandler } from 'services/utils';

class UserAPI {
  login = async (params: any) => {
    return await AxiosHandler.post('/api/token/', params);
  };

  getMe = async (config: any) => {
    return await AxiosHandler.get('/api/me/', config);
  };

  getUser = async (params: any) => {
    const { userId, config = {} } = params;
    return await AxiosHandler.get(`/api/user/${userId}`, config);
  };

  getProfile = async (config: any) => {
    return await AxiosHandler.get('/api/profile/', config);
  };

  editUserProfile = async (data: any) => {
    return await AxiosHandler.post(`/api/profile/update/`, data);
  };

  refresh = async (data: any) => {
    return await axios.post(`${process.env.REACT_APP_BASE_URL}api/token/refresh/`, data);
  };
}

export const user = new UserAPI();
