import { AxiosHandler } from 'services/utils';

class InsurancePolicyAPI {
  getInsurancePolicy = async (params: any) => {
    const { contract, province } = params;

    const add_params = {
      contract,
      ...(province && { province }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/insurancepolicy/?${new_params}`);
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
