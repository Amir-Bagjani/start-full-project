import { APIs } from 'services/APIs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { TRANSFER_LIST } from './useTransferListAPI';

//types
import { APIError } from 'models/APImodels';
import { SingleTransferListParams, SingleTransferListResponse } from 'services/models';

type Data = SingleTransferListResponse;
type Params = SingleTransferListParams;
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const useTransferListSingleAPI = (params: Params, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [TRANSFER_LIST, params],
    queryFn: ({ signal }) => APIs.transferList.getTransferListSingle(params, signal),
    ...options,
  });
};
