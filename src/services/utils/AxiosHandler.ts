//utils
import { request } from './axiosRequest';

//types
import type { AxiosRequestConfig } from 'axios';

export const AxiosHandler = {
  get: async <ServerResponse, ServerError>(url: string, config: AxiosRequestConfig = {}) =>
    await request<ServerResponse, ServerError>({ url, method: 'get', ...config }),

  post: async <ServerResponse, ServerError, Params>(
    url: string,
    data: Params,
    config: AxiosRequestConfig = {},
  ) => await request<ServerResponse, ServerError>({ url, method: 'post', data, ...config }),

  delete: async <ServerResponse, ServerError>(url: string, config: AxiosRequestConfig = {}) =>
    await request<ServerResponse, ServerError>({ url, method: 'delete', ...config }),

  put: async <ServerResponse, ServerError, Params>(
    url: string,
    data: Params,
    config: AxiosRequestConfig = {},
  ) => await request<ServerResponse, ServerError>({ url, method: 'put', data, ...config }),

  patch: async <ServerResponse, ServerError, Params>(
    url: string,
    data: Params,
    config: AxiosRequestConfig = {},
  ) => await request<ServerResponse, ServerError>({ url, method: 'patch', data, ...config }),
};
