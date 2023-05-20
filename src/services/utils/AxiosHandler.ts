//utils
import { request } from './axiosRequest';

//types
import type { AxiosRequestConfig } from 'axios';

export const AxiosHandler = {
  get: async (url: string, config: AxiosRequestConfig = {}) =>
    await request({ url, method: 'get', ...config }),

  post: async <Data>(url: string, data: Data, config: AxiosRequestConfig = {}) =>
    await request({ url, method: 'post', data, ...config }),

  delete: async (url: string, config: AxiosRequestConfig = {}) =>
    await request({ url, method: 'delete', ...config }),

  put: async <Data>(url: string, data: Data, config: AxiosRequestConfig = {}) =>
    await request({ url, method: 'put', data, ...config }),

  patch: async <Data>(url: string, data: Data, config: AxiosRequestConfig = {}) =>
    await request({ url, method: 'patch', data, ...config }),
};
