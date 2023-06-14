import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { APIs } from 'services/APIs';

import { APIError } from 'models/APImodels';
import { TopicTypeResponse } from 'services/models';

export const TOPICS = 'TOPICS';

type Data = TopicTypeResponse;
type Params = {};
type Options = Omit<UseQueryOptions<Data, APIError, Data>, 'queryKey' | 'queryFn'>;

export const useTopicAPI = (params: Params = {}, options: Options = {}) => {
  return useQuery<Data, APIError>({
    queryKey: [TOPICS],
    queryFn: () => APIs.relativeValuePeriod.getTopics(params),
    ...options,
  });
};
