import { AxiosHandler } from 'services/utils';

import { convertValuesToString } from 'utils/helper';

import { APIError } from 'models/APImodels';
import { KtableParams, KtableResponse, TopicTypeResponse } from 'services/models';

class RelativeValuePeriod {
  getTopics = async (config: {}) => {
    return await AxiosHandler.get<TopicTypeResponse, APIError>('/darman/topic/', config);
  };

  getRelativeValuePeriod = async (config: any) => {
    return await AxiosHandler.get('/darman/expense/kperiod', config);
  };

  getRelativeValuePeriodSingle = async (params: any) => {
    return await AxiosHandler.get(`/darman/expense/kperiod/${params.id}`);
  };

  addNewRelativeValuePeriod = async (params: any) => {
    return await AxiosHandler.post('/darman/expense/kperiod/', params);
  };

  addNewRelativeValue = async (params: any) => {
    return await AxiosHandler.post('/darman/expense/ktable/', params);
  };

  editRelativeValuePeriod = async (params: any) => {
    const { id, data } = params;
    return await AxiosHandler.patch(`/darman/expense/kperiod/${id}`, data);
  };

  editRelativeValue = async (params: any) => {
    const { id, data } = params;
    return await AxiosHandler.patch(`/darman/expense/ktable/${id}`, data);
  };

  deleteRelativeValuePeriod = async (params: any) => {
    return await AxiosHandler.delete(`/darman/expense/kperiod/${params.id}`);
  };

  deleteRelativeValue = async (params: any) => {
    return await AxiosHandler.delete(`/darman/expense/ktable/${params.id}`);
  };

  getTablePeriod = async (params: KtableParams) => {
    const { kperiod, page = 1, filter } = params;
    const { name, topic, insured, loadonlyenabledktables } = filter;

    const add_params = {
      ...(kperiod && { kperiod }),
      ...(name && { name }),
      ...(insured && { insured }),
      ...(loadonlyenabledktables && { loadonlyenabledktables }),
      ...(topic && { topic }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<KtableResponse, APIError>(
      `/darman/expense/ktable/?${new_params}`,
    );
  };
}

export const relativeValuePeriod = new RelativeValuePeriod();
