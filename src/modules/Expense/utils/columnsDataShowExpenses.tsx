import { t } from 'i18next';
import { Stack, Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { ExpenseType } from 'services/models';
import { CustomTableColumn, ReturnGenerateTools } from 'modules/common/components';

export const columnsDataShowExpenses: CustomTableColumn<ExpenseType>[] = [
  {
    hide: false,
    field: 'fullName',
    headerName: t('ExNameLabel'),
    width: 150,
    renderCell: (params) => {
      const insured = params.row.insured
        ? params.row.insured.user?.profile?.first_name +
          ' ' +
          params.row.insured.user?.profile?.last_name
        : '';
      const dependant = params.row.dependant
        ? params.row.dependant?.first_name + ' ' + params.row.dependant?.last_name
        : '';

      const insuredNationalcode = params.row.insured.user.profile.national_code;
      const dependantNationalcode = params.row?.dependant?.nationalcode;

      if (!!dependant)
        return (
          <Stack spacing={0}>
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
            <Typography fontSize={14} noWrap>
              {dependantNationalcode}
            </Typography>
          </Stack>
        );

      return (
        <Stack spacing={0}>
          <Tooltip title={insured}>
            <Typography fontSize={14} noWrap>
              {insured}
            </Typography>
          </Tooltip>
          <Typography fontSize={14} noWrap>
            {insuredNationalcode}
          </Typography>
        </Stack>
      );
    },
  },
  // {
  //   hide: false,
  //   field: 'national_code',
  //   headerName: 'کد ملی',
  //   width: 100,
  //   renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
  //     const insuredNationalcode = params.row.insured.user.profile.national_code;
  //     const dependantNationalcode = params.row?.dependant?.nationalcode;

  //     return dependantNationalcode ?? insuredNationalcode;
  //   },
  // },
  {
    hide: false,
    field: 'tracking_code',
    headerName: t('ExTrackingCode'),
    width: 110,
    valueGetter: (params: ReturnGenerateTools<ExpenseType>) => params.row.tracking_code ?? '',
  },
  {
    hide: true,
    field: 'expense_date',
    headerName: t('ExDateOfRegisterExpense'),
    width: 85,

    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
      const { created_at } = params.row;

      const date = DateFormat.fPersianDate(created_at);
      const dateTime = DateFormat.fPersianDateTime(created_at);

      return (
        <Tooltip title={` ${t('ExDateAndTime')} : ${dateTime}`}>
          <Typography fontSize={14}>{date}</Typography>
        </Tooltip>
      );
    },
  },
  {
    hide: true,
    field: 'date',
    headerName: t('ExDateOfExpense'),
    width: 85,

    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
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
  {
    hide: true,
    field: 'created_by',
    headerName: t('ExCreatedBy'),
    width: 140,

    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
      const { first_name = '', last_name = '' } = params.row.created_by.profile;

      return (
        <Tooltip title={first_name + ' ' + last_name}>
          <Typography fontSize={14}>{first_name + ' ' + last_name}</Typography>
        </Tooltip>
      );
    },
  },
  {
    hide: false,
    field: 'expense_type',
    headerName: t('ExpenseExpType'),
    width: 90,
    valueGetter: (params: ReturnGenerateTools<ExpenseType>) => params.row?.expense_type?.name ?? '',
  },
  {
    hide: false,
    field: 'topic_name',
    headerName: t('ExTopicLabel'),
    width: 170,

    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
      const name = params.row?.topic?.name ?? '';

      return (
        <Tooltip title={name}>
          <Typography noWrap fontSize={14}>
            {name}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    hide: false,
    field: 'amount',
    headerName: t('ExAmountToRial'),
    width: 90,
    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
      const { amount = 0 } = params.row;

      return (
        <Tooltip title={`${NumberFormat.numberToText(amount / 10)} ${t('ExToman')}`}>
          <Typography fontSize={14}>{NumberFormat.separateNum(amount)}</Typography>
        </Tooltip>
      );
    },
  },
  {
    hide: true,
    field: 'deductions',
    headerName: t('ExDeduction'),
    width: 80,
    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
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
    hide: false,
    field: 'adjustprice',
    headerName: t('ExAdjusterPrice'),
    width: 90,
    renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
      const { adjustprice } = params.row;

      return (
        <Tooltip title={`${NumberFormat.numberToText(adjustprice / 10)} ${t('ExToman')}`}>
          <Typography fontSize={14}>{NumberFormat.separateNum(adjustprice)}</Typography>
        </Tooltip>
      );
    },
  },
  {
    hide: true,
    field: 'transfer',
    headerName: t('ExTrnsferList'),
    width: 90,
    renderCell: (params) => {
      const { transfer } = params.row;

      return (
        <Tooltip title={transfer?.title ?? ''}>
          <Typography fontSize={14}>{transfer?.title ?? '-'}</Typography>
        </Tooltip>
      );
    },
  },
  {
    hide: true,
    field: 'expense_status',
    headerName: t('ExpenseExpStatus'),
    width: 100,
    valueGetter: (params: ReturnGenerateTools<ExpenseType>) =>
      params.row?.expense_status?.name ?? '',
  },
];
