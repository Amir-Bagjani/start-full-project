import { APIError } from 'models/APImodels';
import { InsurancePlicyParams, InsurancePolicyResponse } from 'services/models';
import { AxiosHandler } from 'services/utils';
import { convertValuesToString } from 'utils/helper';

class InsurancePolicyAPI {
  getInsurancePolicy = async (params: InsurancePlicyParams) => {
    const { contract, province } = params;

    const add_params = {
      ...(contract && { contract }),
      ...(province && { province }),
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<InsurancePolicyResponse, APIError>(
      `/darman/insurancepolicy/?${new_params}`,
    );
  };

  addNewInsurancePolicy = async (data: any) => {
    return await AxiosHandler.post('/darman/insurancepolicy/', data);
  };

  deleteInsurancePolicy = async (params: any) => {
    return await AxiosHandler.delete(`/darman/insurancepolicy/${params.id}`);
  };

  editInsurancePolicy = async (params: any) => {
    const { id, data } = params;
    return await AxiosHandler.patch(`/darman/insurancepolicy/${id}`, data);
  };

  editInsuredOfInsurancePolicy = async (params: any) => {
    const { contractId, data } = params;
    return await AxiosHandler.patch(`/darman/contract/${contractId}`, data);
  };
}

export const insurancePolicy = new InsurancePolicyAPI();
