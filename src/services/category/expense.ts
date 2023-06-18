import { AxiosHandler } from 'services/utils';

//types
import {
  ExpenseTypeParams,
  ExpenseTypeResponse,
  TypeExpenseTypeResponse,
  ExpenseStatusTypeResponse,
  ActionExpenseResponse,
  ActionExpenseParams,
  SampleDescriptionResponse,
  SampleDescriptionParams,
  ChangeAgencyLocationParams,
  ChangeAgencyLocationResponse,
  LogExpenseResponse,
  LogExpenseParams,
} from 'services/models';
import { APIError } from 'models/APImodels';
import { convertValuesToString } from 'utils/helper/convertToString';

class ExpenseAPI {
  getArchiveTable = async (params: any) => {
    const { filter, page = 1 } = params;
    const { expense, costType, fdate, tdate, expenseStatus, expense_status_code, name, province } =
      filter;

    const add_params = {
      ...(expense && { expense }),
      ...(costType && { cost_center_type: costType }),
      ...(fdate && { fdate }),
      ...(tdate && { tdate }),
      ...(name && { name }),
      ...(expenseStatus && { expense_status: expenseStatus }),
      ...(province && { province }),
      ...(expense_status_code && { expense_status_code }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get(`/darman/expense/archive/?${new_params}`);
  };

  getAllExpenses = async (params: ExpenseTypeParams) => {
    const { filter, mode = '', transfer = '', page = 1 } = params;
    const { name, expense_status, province, fdate, tdate, expense_type, insurancepolicy } = filter;

    const add_params = {
      ...(name && { name }),
      ...(fdate && { fdate }),
      ...(tdate && { tdate }),
      ...(mode && { mode }),
      ...(transfer && { transfer }),
      ...(province && { province }),
      ...(expense_type && { expense_type }),
      ...(expense_status && { expense_status }),
      ...(insurancepolicy && { insurancepolicy }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<ExpenseTypeResponse, APIError>(`/darman/expense/?${new_params}`);
  };

  getAllCostCenterType = async (params: any) => {
    return await AxiosHandler.get('/darman/expense/costcentertype/', params);
  };

  getAllExpenseStatus = async (params: {}) => {
    return await AxiosHandler.get<ExpenseStatusTypeResponse, APIError>(
      '/darman/expense/expensestatus/',
      params,
    );
  };

  getAllExpenseType = async (params: {}) => {
    return await AxiosHandler.get<TypeExpenseTypeResponse, APIError>(
      '/darman/expense/expensetype/',
      params,
    );
  };

  getExpenseDoc = async (params: any) => {
    return await AxiosHandler.get(
      `/darman/expense/expensedocument/?expense=${String(params.expenseId)}`,
    );
  };

  getLogExpense = async (params: LogExpenseParams) => {
    return await AxiosHandler.get<LogExpenseResponse, APIError>(
      `/darman/expense/log/?expense=${String(params.expense)}`,
    );
  };

  getExtraPrintInfo = async (params: any) => {
    return await AxiosHandler.get(
      `/darman/expense/extrainfo/?expenses=${String(params.expenseId)}`,
    );
  };

  getSampleDescription = async (params: SampleDescriptionParams) => {
    return await AxiosHandler.get<SampleDescriptionResponse, APIError>(
      `/darman/expense/sampledescription/?type=${String(params.type)}`,
    );
  };

  actionExpense = async (params: ActionExpenseParams) => {
    /*
     * actiontype: 1 => hardcoded value for confirm expense
     * actiontype: 2 => hardcoded value for return expense
     * actiontype: 5 => hardcoded value for send expense to master
     * actiontype: 6 => hardcoded value for cancel expense
     */
    return await AxiosHandler.post<ActionExpenseResponse, APIError, ActionExpenseParams>(
      '/darman/expense/send/',
      params,
    );
  };

  getEvaluationAdjustList = async (params: any) => {
    return await AxiosHandler.get(
      `/darman/expense/expenseadjust/?expense=${String(params.expenseId)}`,
    );
  };

  sendEvaluationAdjustment = async (data: any) => {
    return await AxiosHandler.post('/darman/expense/expenseadjust/', data);
  };

  deleteEvaluationAdjustment = async (params: any) => {
    return await AxiosHandler.delete(`/darman/expense/expenseadjust/${params.id}`);
  };

  calcExpensePrice = async (params: any) => {
    return await AxiosHandler.post('/darman/expense/calcexpenseprice/', params);
  };

  editExpense = async (params: any) => {
    const { expenseId, data } = params;
    return await AxiosHandler.patch(`/darman/expense/${expenseId}/`, data);
  };

  getExpenseByStatus = async (params: any) => {
    const { province, contract = 9 } = params; //contract 9 is آموزش و پرورش

    const add_params = {
      contract,
      ...(!!province && { province }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/expense/expensebystatustotalreport/?${new_params}`);
  };

  getExpenseByDate = async (params: any) => {
    const { province, contract = 9, fdate, tdate } = params; //contract 9 is آموزش و پرورش

    const add_params = {
      contract,
      ...(!!province && { province }),
      fdate,
      tdate,
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/expense/expensecounttotalreport/?${new_params}`);
  };

  getUserReport = async (params: any) => {
    const { province, contract, fdate, tdate, user, to_excel } = params;

    const add_params = {
      ...(!!contract && { contract }),
      ...(!!user && { user }),
      ...(!!fdate && { fdate }),
      ...(!!tdate && { tdate }),
      ...(!!province && { province }),
      ...(!!to_excel && { to_excel }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(
      `/darman/expense/expensereportbyuser/?${new_params}`,
      !!to_excel ? { responseType: 'blob' } : {},
    );
  };

  getInsuredAndDependent = async (params: any) => {
    const { listtype, name = '' } = params;

    const add_params = {
      ...(!!listtype && { listtype }),
      ...(!!name && { name }),
    };

    const new_params = new URLSearchParams(add_params).toString();

    return await AxiosHandler.get(`/darman/insured/?${new_params}`);
  };

  changeAgencyLocation = async (params: ChangeAgencyLocationParams) => {
    return await AxiosHandler.post<
      ChangeAgencyLocationResponse,
      APIError,
      ChangeAgencyLocationParams
    >('/darman/expense/agency/', params);
  };
}

export const expense = new ExpenseAPI();
