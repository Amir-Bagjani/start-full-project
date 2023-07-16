import { APIError } from 'models/APImodels';
import {
  ContractAddendumParams,
  ContractAddendumResponse,
  ContractObligationParams,
  ContractObligationResponse,
  ContractWaitingListParams,
  ContractWaitingListResponse,
} from 'services/models';
import { AxiosHandler } from 'services/utils';

class Contract {
  getContractAdjusters = async (params: any) => {
    const { contract, adjustertypecode, name, exclude_contract } = params;

    //adjustertypecode = 1 for adjuster
    //adjustertypecode = 2 for super adjuster

    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!adjustertypecode && { adjustertypecode }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/adjuster/?${new_params}`);
  };

  getContractCounter = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/counter/?${new_params}`);
  };

  getContractReceiptionict = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/receiptionict/?${new_params}`);
  };

  getContractRegistrar = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/registrar/?${new_params}`);
  };

  getContractAdmin = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/admin/?${new_params}`);
  };

  getContractLossadjuster = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/lossadjuster/?${new_params}`);
  };

  getContractTrusteddoctor = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/trusteddoctor/?${new_params}`);
  };

  getContractReporter = async (params: any) => {
    const { contract, name, exclude_contract } = params;
    //exclude_contract=contractId means those who didn't add to the contract.

    const add_params = {
      ...(!!name && { name }),
      ...(!!contract && { contract }),
      ...(!!exclude_contract && { exclude_contract }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/reporter/?${new_params}`);
  };

  editContract = async (params: any) => {
    const { contractId, data } = params;
    return await AxiosHandler.patch(`/darman/contract/${contractId}`, data);
  };

  getContractObligations = async (params: ContractObligationParams) => {
    const { contractId } = params;
    return await AxiosHandler.get<ContractObligationResponse, APIError>(
      `/darman/obligation/?contract=${contractId}`,
    );
  };

  getContractAddendum = async (params: ContractAddendumParams) => {
    const { contractId } = params;
    return await AxiosHandler.get<ContractAddendumResponse, APIError>(
      `/darman/supplement/?contract=${contractId}`,
    );
  };

  getContractWaitingPeriod = async (params: ContractWaitingListParams, signal?: AbortSignal) => {
    const { contractId } = params;
    return await AxiosHandler.get<ContractWaitingListResponse, APIError>(
      `/darman/waitingperiod/?contract=${contractId}`,
      { signal },
    );
  };
}

export const contract = new Contract();
