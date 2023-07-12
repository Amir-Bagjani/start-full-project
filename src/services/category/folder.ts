import { AxiosHandler } from 'services/utils';

//utils
import { convertValuesToString } from 'utils/helper';

//types
import {
  FolderExpenseParams,
  ContractTypeResponse,
  FolderExpenseResponse,
  EditFolderExpenseParams,
  DeleteFolderExpenseParams,
  SingleFolderExpenseParams,
  EditFolderExpenseResponse,
  SingleFolderExpenseResponse,
  AddFolderExpenseParams,
  AddFolderExpenseResponse,
} from 'services/models';
import { APIError } from 'models/APImodels';

class Folder {
  getFolders = async (params: FolderExpenseParams, signal?: AbortSignal) => {
    const { filter, page = 1 } = params;
    const { name } = filter;

    const add_params = {
      ...(name && { name }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<FolderExpenseResponse, APIError>(
      `/darman/expense/folder/?${new_params}`,
      { signal },
    );
  };

  getSingleFolder = async (params: SingleFolderExpenseParams, signal?: AbortSignal) => {
    return await AxiosHandler.get<SingleFolderExpenseResponse, APIError>(
      `/darman/expense/folder/${params.id}`,
      { signal },
    );
  };

  deleteFolder = async (params: DeleteFolderExpenseParams) => {
    return await AxiosHandler.delete<{}, APIError>(`/darman/expense/folder/${params.id}`);
  };

  editFolder = async (params: EditFolderExpenseParams) => {
    const { id, data } = params;
    return await AxiosHandler.patch<
      EditFolderExpenseResponse,
      APIError,
      EditFolderExpenseParams['data']
    >(`/darman/expense/folder/${id}`, data);
  };

  addFolder = async (params: AddFolderExpenseParams) => {
    return await AxiosHandler.post<AddFolderExpenseResponse, APIError, AddFolderExpenseParams>(
      '/darman/expense/folder/',
      params,
    );
  };

  getContract = async (params?: {}, signal?: AbortSignal) => {
    return await AxiosHandler.get<ContractTypeResponse, APIError>('/darman/contract/', { signal });
  };
}

export const folder = new Folder();
