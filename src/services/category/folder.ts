import { AxiosHandler } from 'services/utils';

//types
import { APIError } from 'models/APImodels';
import { ContractTypeResponse } from 'services/models';

class Folder {
  getFolders = async (params: any) => {
    const { filter, page = 1 } = params;
    const { name } = filter;

    const add_params = {
      ...(name && { name }),
      page,
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/expense/folder/?${new_params}`);
  };

  getSingleFolder = async (params: any) => {
    return await AxiosHandler.get(`/darman/expense/folder/${params.id}`);
  };

  deleteFolder = async (params: any) => {
    return await AxiosHandler.delete(`/darman/expense/folder/${params.id}`);
  };

  editFolder = async (params: any) => {
    const { id, data } = params;
    return await AxiosHandler.patch(`/darman/expense/folder/${id}`, data);
  };

  addFolder = async (params: any) => {
    return await AxiosHandler.post('/darman/expense/folder/', params);
  };

  getContract = async (params?: {}, signal?: AbortSignal) => {
    return await AxiosHandler.get<ContractTypeResponse, APIError>('/darman/contract/', { signal });
  };
}

export const folder = new Folder();
