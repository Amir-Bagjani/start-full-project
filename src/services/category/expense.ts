import { AxiosHandler } from 'services/utils';

//types
import {
  ExpenseDocParams,
  LogExpenseParams,
  ExpenseTypeParams,
  EditExpenseParams,
  ExpenseDocResponse,
  CostCenterResponse,
  LogExpenseResponse,
  ExpenseTypeResponse,
  EditExpenseResponse,
  ActionExpenseParams,
  ToothNumberResponse,
  ActionExpenseResponse,
  CalcExpensePriceParams,
  EvaluationDetailParams,
  SampleDescriptionParams,
  TypeExpenseTypeResponse,
  CalcExpensePriceResponse,
  EvaluationDetailResponse,
  SampleDescriptionResponse,
  ExpenseStatusTypeResponse,
  ExpenseArchivedTypeParams,
  SingleExpenseDetailParams,
  ChangeAgencyLocationParams,
  SingleExpenseDetailResponse,
  ExpenseArchivedTypeResponse,
  ChangeAgencyLocationResponse,
  AddEvaluationAdjustmentParams,
  AddEvaluationAdjustmentResponse,
  DeleteEvaluationAdjustmentParams,
  InsuredExpenseHistoryParams,
  InsuredExpenseHistoryResponse,
  DependantOfInsuredResponse,
  DependantOfInsuredParams,
  PrintExpenseParams,
  PrintExpenseResponse,
  PrintExpenseExtraDataResponse,
  PrintExpenseExtraDataParams,
  ChangeExpenseStatusParams,
  ChangeExpenseStatusResponse,
} from 'services/models';
import { APIError } from 'models/APImodels';
import { convertValuesToString } from 'utils/helper/convertToString';

class ExpenseAPI {
  getArchiveTable = async (params: ExpenseArchivedTypeParams, signal?: AbortSignal) => {
    const { filter, page = 1 } = params;
    const {
      expense,
      cost_center_type,
      fdate,
      tdate,
      expense_status,
      expense_status_code,
      name,
      province,
    } = filter;

    const add_params = {
      ...(name && { name }),
      ...(tdate && { tdate }),
      ...(fdate && { fdate }),
      ...(expense && { expense }),
      ...(province && { province }),
      ...(expense_status && { expense_status }),
      ...(cost_center_type && { cost_center_type }),
      ...(expense_status_code && { expense_status_code }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<ExpenseArchivedTypeResponse, APIError>(
      `/darman/expense/archive/?${new_params}`,
      { signal },
    );
  };

  getAllExpenses = async (params: ExpenseTypeParams, signal?: AbortSignal) => {
    const { filter, mode = '', transfer = '', page = 1 } = params;
    const {
      topic,
      has_transfer,
      contract,
      name,
      expense_status,
      province,
      fdate,
      tdate,
      expense_type,
      insurancepolicy,
    } = filter;

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
      ...(topic && { topic }),
      ...(contract && { contract }),
      ...(has_transfer && { has_transfer }),
      page,
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<ExpenseTypeResponse, APIError>(`/darman/expense/?${new_params}`, {
      signal,
    });
  };

  getSingleExpenses = async (params: SingleExpenseDetailParams) => {
    const { expenseId } = params;
    return await AxiosHandler.get<SingleExpenseDetailResponse, APIError>(
      `/darman/expense/${expenseId}/`,
    );
  };

  getPrintexpenses = async (params: PrintExpenseParams, signal?: AbortSignal) => {
    const { expenseIds } = params;
    return await AxiosHandler.get<PrintExpenseResponse, APIError>(
      `/darman/expense/?ids=${expenseIds}`,
      { signal },
    );
  };

  getAllCostCenterType = async (config: {}) => {
    return await AxiosHandler.get<CostCenterResponse, APIError>(
      '/darman/expense/costcentertype/',
      config,
    );
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

  getExpenseDoc = async (params: ExpenseDocParams) => {
    return await AxiosHandler.get<ExpenseDocResponse, APIError>(
      `/darman/expense/expensedocument/?expense=${String(params.expenseId)}`,
    );
  };

  getLogExpense = async (params: LogExpenseParams) => {
    return await AxiosHandler.get<LogExpenseResponse, APIError>(
      `/darman/expense/log/?expense=${String(params.expense)}`,
    );
  };

  getExtraPrintInfo = async (params: PrintExpenseExtraDataParams, signal?: AbortSignal) => {
    return await AxiosHandler.get<PrintExpenseExtraDataResponse, APIError>(
      `/darman/expense/extrainfo/?expenses=${String(params.expenseIds)}`,
      { signal },
    );
  };

  getSampleDescription = async (params: SampleDescriptionParams) => {
    /*
     * type: 1 => hardcoded value for return
     * type: 6 => hardcoded value for adjuster comments in adjustment evaluation
     * type: 7 => hardcoded value for send to trusted doctor
     * type: 8 => hardcoded value for send to master adjuster(super adjuster)
     */
    return await AxiosHandler.get<SampleDescriptionResponse, APIError>(
      `/darman/expense/sampledescription/?type=${String(params.type)}`,
    );
  };

  actionExpense = async (params: ActionExpenseParams) => {
    /*
     * actiontype: 1 => hardcoded value for confirm expense(تایید)
     * actiontype: 2 => hardcoded value for return(reject) expense(رد)
     * actiontype: 3 => hardcoded value for send expense to master(کارشناس ارشد)
     * actiontype: 4 => hardcoded value for send expense to trusted doctor(پزشک معتمد)
     * actiontype: 5 => hardcoded value for send expense to adjuster(کارشناس)
     * actiontype: 6 => hardcoded value for cancel expense(ابطال)
     */
    return await AxiosHandler.post<ActionExpenseResponse, APIError, ActionExpenseParams>(
      '/darman/expense/send/',
      params,
    );
  };

  getEvaluationAdjustList = async (params: EvaluationDetailParams) => {
    return await AxiosHandler.get<EvaluationDetailResponse, APIError>(
      `/darman/expense/expenseadjust/?expense=${String(params.expenseId)}`,
    );
  };

  sendEvaluationAdjustment = async (data: AddEvaluationAdjustmentParams) => {
    return await AxiosHandler.post<
      AddEvaluationAdjustmentResponse,
      APIError,
      AddEvaluationAdjustmentParams
    >('/darman/expense/expenseadjust/', data);
  };

  deleteEvaluationAdjustment = async (params: DeleteEvaluationAdjustmentParams) => {
    return await AxiosHandler.delete<{}, APIError>(`/darman/expense/expenseadjust/${params.id}`);
  };

  calcExpensePrice = async (params: CalcExpensePriceParams) => {
    return await AxiosHandler.post<CalcExpensePriceResponse, APIError, CalcExpensePriceParams>(
      '/darman/expense/calcexpenseprice/',
      params,
    );
  };

  editExpense = async (params: EditExpenseParams) => {
    const { expenseId, data } = params;
    return await AxiosHandler.patch<EditExpenseResponse, APIError, EditExpenseParams['data']>(
      `/darman/expense/${expenseId}/`,
      data,
    );
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

  getInsuredAndDependent = async (params: DependantOfInsuredParams, signal?: AbortSignal) => {
    const { listtype, name = '' } = params;

    const add_params = {
      ...(!!listtype && { listtype }),
      ...(!!name && { name }),
    };

    const new_params = convertValuesToString(add_params);

    return await AxiosHandler.get<DependantOfInsuredResponse, APIError>(
      `/darman/insured/?${new_params}`,
      { signal },
    );
  };

  changeAgencyLocation = async (params: ChangeAgencyLocationParams) => {
    return await AxiosHandler.post<
      ChangeAgencyLocationResponse,
      APIError,
      ChangeAgencyLocationParams
    >('/darman/expense/agency/', params);
  };

  getExtraApprovedCostPrice = async (params: any) => {
    return await AxiosHandler.get(
      `/darman/expense/extraapprovedcostprice/?costgroup=${String(params.costgroup)}`,
    );
  };

  addExtraApprovedCostPrice = async (params: any) => {
    return await AxiosHandler.post('/darman/expense/extraapprovedcostprice/', params);
  };

  editExtraApprovedCostPrice = async (params: any) => {
    const { data, id } = params;
    return await AxiosHandler.patch(`/darman/expense/extraapprovedcostprice/${id}`, data);
  };

  deleteExtraApprovedCostPrice = async (params: any) => {
    return await AxiosHandler.delete(`/darman/expense/extraapprovedcostprice/${params.id}`);
  };

  getInsuredExpenseHistory = async (params: InsuredExpenseHistoryParams) => {
    const { insured, dependant, date, topic, page = 1 } = params;

    const add_params = {
      ...(!!insured && { insured }),
      ...(!!dependant && { dependant }),
      ...(!!date && { date }),
      ...(!!topic && { topic }),
      page,
    };

    const new_params = convertValuesToString(add_params);
    return await AxiosHandler.get<InsuredExpenseHistoryResponse, APIError>(
      `/darman/expense/history/?${new_params}`,
    );
  };

  getToothNumbers = async (config: {}) => {
    return await AxiosHandler.get<ToothNumberResponse, APIError>(
      '/darman/expense/toothnumbers/',
      config,
    );
  };

  chnageExpenseStatus = async (params: ChangeExpenseStatusParams) => {
    return await AxiosHandler.post<
      ChangeExpenseStatusResponse,
      APIError,
      ChangeExpenseStatusParams
    >('/darman/expense/changeexpensesstatus/', params);
  };
}

export const expense = new ExpenseAPI();
