import { AxiosHandler } from 'services/utils';

class InsuredAPI {
  getInsurancePolicy = async (params: any) => {
    const {
      province,
      exclude_insurancepolicy,
      exclude_contract,
      page = 1,
      name,
      insurancepolicy,
      contract,
    } = params;

    const add_params = {
      page,
      ...(!!exclude_insurancepolicy && { exclude_insurancepolicy }),
      ...(!!exclude_contract && { exclude_contract }),
      ...(!!insurancepolicy && { insurancepolicy }),
      ...(!!province && { province }),
      ...(!!name && { name }),
      ...(!!contract && { contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/insured/?${new_params}`);
  };
}

export const insured = new InsuredAPI();
