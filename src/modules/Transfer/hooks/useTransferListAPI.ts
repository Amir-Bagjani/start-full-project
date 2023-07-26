import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

//types
import { APIError } from 'models/APImodels';
import { TransfersListParams, TransfersListResponse } from 'services/models';

type Data = TransfersListResponse;
type Params = TransfersListParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const TRANSFER_LIST = 'TRANSFER_LIST';

export const useTransferListAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [TRANSFER_LIST, params],
    queryFn: ({ signal }) => APIs.transferList.getTransferList(params, signal),
    ...options,
  });
};
