import axios from 'axios';

//utils
import { APIs } from 'services/APIs';
// import { TokenService } from './TokenService';

//types
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { Constants } from 'utils/constants';
import { User } from 'models/User.type';

/**
 * for multiple requests on a page that the interceptor do not trigger for each of them,
 *  interceptor sholud be modified to use a refresh token queue.
 *
 * subscribeTokenRefresh(cb):
 *  This function takes a callback function as its argument and adds it to the refreshSubscribers array.
 *  The callback function will be called when the access token is refreshed successfully.
 *
 * onRefreshed(token):
 *  This function takes the new access token as its argument and calls all the callback functions in the refreshSubscribers array with the new access token.
 *  In the response interceptor, we first check if isRefreshing is true. If it is, it means that there is already a request being made to refresh the token.
 *  In this case, we add the original request to the refreshSubscribers array and wait for the new access token to be received. Once we receive the new access token,
 *  we update the Authorization header of the original request with the new access token and retry the request.
 *  If isRefreshing is false, it means that this is the first request that requires a new access token.
 *  In this case, we set isRefreshing to true and send a request to refresh the token.
 */

//TODO: fix all type in this file
let isRefreshing = false;
let refreshSubscribers: Function[] = [];

function subscribeTokenRefresh(cb: Function) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
}

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

//set token in header
client.interceptors.request.use(
  (config) => {
    let user = Cookies.get(Constants.UserStorageName);
    // const token = TokenService.getLocalAccessToken();
    if (!!user) {
      let token = (JSON.parse(user) as User).access;
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.request.responseURL.search('/api/token/') === -1
    ) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve) => subscribeTokenRefresh(resolve));
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return client(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;
      // const refreshToken = TokenService.getRefreshToken();
      let user = Cookies.get(Constants.UserStorageName);

      if (user) {
        let refreshToken = (JSON.parse(user) as User).refresh;
        try {
          const rs = await APIs.user.refresh({
            refresh: refreshToken,
          });

          const { access } = rs.data;

          // TokenService.setLocalAccessToken(access);
          Cookies.set(Constants.UserStorageName, JSON.stringify(user), {
            secure: true,
            sameSite: 'strict',
            path: '/',
          });

          client.defaults.headers.common.Authorization = `Bearer ${access}`;
          onRefreshed(access);
          refreshSubscribers = [];
          return client(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];

          // handle refresh token error
          // TokenService.removeLocalAccessToken();
          Cookies.remove(Constants.UserStorageName);
          alert('!!لطفا وارد حساب کاربری خود شوید');
          window.location.reload();
          // return Promise.reject(refreshError);
        }
      } else {
        isRefreshing = false;

        // handle missing refresh token error
        // TokenService.removeLocalAccessToken();
        Cookies.remove(Constants.UserStorageName);
        alert('لطفا وارد حساب کاربری خود شوید');
        window.location.reload();
        // return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const request = <Data, Error>({ ...options }: AxiosRequestConfig<Data>) => {
  const onSuccess = (response: AxiosResponse<Data>) => Promise.resolve(response.data);

  const onError = (error: AxiosError<Error>) => Promise.reject(error.response?.data);

  return client(options).then(onSuccess).catch(onError);
};
