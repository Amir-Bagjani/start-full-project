import { AxiosHandler } from 'services/utils';

class TransferList {
  getTransferList = async (config = {}) => {
    return await AxiosHandler.get('/darman/expense/transfer/', config);
  };

  getTransferListSingle = async (params: any) => {
    return await AxiosHandler.get(`/darman/expense/transfer/${params.id}`);
  };

  addTransfer = async (data: any) => {
    return await AxiosHandler.post('/darman/expense/transfer/', data);
  };

  editTransfer = async (params: any) => {
    const { id, data } = params;
    return await AxiosHandler.patch(`/darman/expense/transfer/${id}`, data);
  };

  deleteFolder = async (params: any) => {
    return await AxiosHandler.delete(`/darman/expense/transfer/${params.id}`);
  };
}

export const transferList = new TransferList();
