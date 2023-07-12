import { t } from 'i18next';
import { Tooltip, Typography } from '@mui/material';

//components
import { CustomTableColumn, ReturnGenerateTools } from '../components';

//types
import { ExpenseArchivedType } from 'services/models';
import { DateFormat, NumberFormat } from 'utils/helper';

export const columnsDataArchiveReport: CustomTableColumn<ExpenseArchivedType>[] = [
  {
    field: 'number',
    headerName: t('ExNumber'),
    width: 45,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'fullName',
    headerName: t('ExNameLabel'),
    width: 140,
    renderCell: (params) => {
      const insured = params.row.insured
        ? params.row.insured.user?.profile?.first_name +
          ' ' +
          params.row.insured.user?.profile?.last_name
        : '';
      const dependant = params.row.dependant
        ? params.row.dependant?.first_name + ' ' + params.row.dependant?.last_name
        : '';

      if (!!dependant)
        return (
          <Tooltip title={dependant}>
            <>
              <Typography
                noWrap
                color='grey.500'
                className='hover-show'
                sx={{ display: 'none', fontSize: '12px !important' }}
              >
                {insured}
              </Typography>
              <Typography fontSize={14} noWrap>
                {dependant}
              </Typography>
            </>
          </Tooltip>
        );

      return (
        <Tooltip title={insured}>
          <Typography noWrap>{insured}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'amount',
    headerName: t('ExAmountToRial'),
    width: 90,
    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
      const { amount = 0 } = params.row;

      return (
        <Tooltip title={`${NumberFormat.numberToText(amount / 10)} ${t('ExToman')}`}>
          <Typography fontSize={14}>{NumberFormat.separateNum(amount)}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'adjustprice',
    headerName: t('ExAdjusterPrice'),
    width: 90,
    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
      const { adjustprice } = params.row;

      return (
        <Tooltip title={`${NumberFormat.numberToText(adjustprice / 10)} ${t('ExToman')}`}>
          <Typography>{NumberFormat.separateNum(adjustprice)}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'deductions',
    headerName: t('ExDeduction'),
    width: 80,
    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
      const deductions = Number(params.row.amount) - Number(params.row.adjustprice);

      return (
        <Tooltip title={`${NumberFormat.numberToText(deductions / 10)} ${t('ExToman')}`}>
          <Typography fontSize={14}>
            {params.row.adjustprice !== 0 ? NumberFormat.separateNum(deductions) : 0}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'expense_type',
    headerName: t('ExpenseExpType'),
    width: 90,
    valueGetter: (params: ReturnGenerateTools<ExpenseArchivedType>) =>
      params.row?.expense_type?.name ?? '',
  },
  {
    field: 'cost_center_type',
    headerName: t('ExpenseExpCostCenterType'),
    width: 80,
    valueGetter: (params: ReturnGenerateTools<ExpenseArchivedType>) =>
      params.row.cost_center_type?.name ?? '',
  },
  {
    field: 'expense_status',
    headerName: t('ExpenseExpStatus'),
    width: 120,
    valueGetter: (params: ReturnGenerateTools<ExpenseArchivedType>) =>
      params.row?.expense_status?.name ?? '',
  },
  {
    field: 'expense_date',
    headerName: t('ExDateOfRegisterExpense'),
    width: 85,

    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
      const { created_at } = params.row;

      const date = DateFormat.fPersianDate(created_at);
      const dateTime = DateFormat.fPersianDateTime(created_at);

      return (
        <Tooltip title={` ${t('ExDateAndTime')} : ${dateTime}`}>
          <Typography>{date}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'date',
    headerName: t('ExDateOfExpense'),
    width: 85,
    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
      const { date } = params.row;

      const Expensedate = DateFormat.fPersianDate(date);
      const ExpensedateTime = DateFormat.fPersianDateTime(date);

      return (
        <Tooltip title={` ${t('ExDateAndTime')} : ${ExpensedateTime}`}>
          <Typography fontSize={14}>{Expensedate}</Typography>
        </Tooltip>
      );
    },
  },
];
