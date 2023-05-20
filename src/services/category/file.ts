import { AxiosHandler } from 'services/utils';

class File {
  sendFile = async (params: any) => {
    return await AxiosHandler.post('darman/importfromfile/', params.data, params.config);
  };
}

export const file = new File();
