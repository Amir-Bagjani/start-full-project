//util
import { convertValuesToString } from 'utils/helper';

//types
import { APIError } from 'models/APImodels';
import { AxiosHandler } from 'services/utils';
import {
  AddTransferListParams,
  AddTransferListResponse,
  AggregationTransferListParams,
  AggregationTransferListResponse,
  DeleteTransferListParams,
  DeleteTransferListResponse,
  EditTransferListParams,
  EditTransferListResponse,
  SentToFanavaranParams,
  SentToFanavaranResponse,
  SingleTransferListParams,
  SingleTransferListResponse,
  TransfersListParams,
  TransfersListResponse,
} from 'services/models';

class TransferList {
  getTransferList = async (params: TransfersListParams, signal?: AbortSignal) => {
    const { page = 1 } = params;

    const add_params = {
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<TransfersListResponse, APIError>(
      `/darman/expense/transfer/?${new_params}`,
      { signal },
    );
  };

  getAggregationTransferList = async (
    params: AggregationTransferListParams,
    signal?: AbortSignal,
  ) => {
    const { transfer, fdate, tdate, user, name, page } = params;

    const add_params = {
      ...(!!user && { user }),
      ...(!!name && { name }),
      ...(!!fdate && { fdate }),
      ...(!!tdate && { tdate }),
      ...(!!transfer && { transfer }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<AggregationTransferListResponse, APIError>(
      `/darman/expense/readytopayexpensereportbyuser/?${new_params}`,
      { signal },
    );
  };
  getTransferListSingle = async (params: SingleTransferListParams, signal?: AbortSignal) => {
    return await AxiosHandler.get<SingleTransferListResponse, APIError>(
      `/darman/expense/transfer/${params.id}`,
      { signal },
    );
  };

  addTransfer = async (data: AddTransferListParams) => {
    return await AxiosHandler.post<AddTransferListResponse, APIError, AddTransferListParams>(
      '/darman/expense/transfer/',
      data,
    );
  };

  editTransfer = async (params: EditTransferListParams) => {
    const { id, data } = params;
    return await AxiosHandler.patch<
      EditTransferListResponse,
      APIError,
      EditTransferListParams['data']
    >(`/darman/expense/transfer/${id}`, data);
  };

  deleteFolder = async (params: DeleteTransferListParams) => {
    return await AxiosHandler.delete<DeleteTransferListResponse, APIError>(
      `/darman/expense/transfer/${params.id}`,
    );
  };

  sendToFanavaran = async (params: SentToFanavaranParams) => {
    return await AxiosHandler.post<SentToFanavaranResponse, APIError, SentToFanavaranParams>(
      '/darman/expense/sendtransfertofanavaran/',
      params,
    );
  };
}

export const transferList = new TransferList();
