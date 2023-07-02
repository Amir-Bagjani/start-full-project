import { t } from 'i18next';
import { Stack, Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { ExpenseArchivedType } from 'services/models';
import { CustomTableColumn, ReturnGenerateTools } from 'modules/common/components';

export const columnsDataArchiveExpenses: CustomTableColumn<ExpenseArchivedType>[] = [
  // {
  //   field: "fullName",
  //   hide: false,
  //   headerName: "نام و نام خانوادگی",
  //   description: "نمایش نام و نام خانوادگی",
  //   sortable: false,
  //   width: 160,
  //   renderCell: (params) => {
  //     const insured = params.row.insured ? params.row.insured.user?.profile?.first_name + " " + params.row.insured.user?.profile?.last_name : "";
  //     const dependant = params.row.dependant ? params.row.dependant?.first_name + " " + params.row.dependant?.last_name : "";

  //     if (!!dependant) return (
  //       <Tooltip title={dependant}>
  //         <>
  //           <Typography noWrap color="grey.500" className="hover-show" sx={{ display: "none", fontSize: "12px !important" }}>
  //             {insured}
  //           </Typography>
  //           <Typography fontSize={14} noWrap>
  //             {dependant}
  //           </Typography>
  //         </>
  //       </Tooltip>
  //     )

  //     return (
  //       <Tooltip title={insured}>
  //         <Typography fontSize={14} noWrap>
  //           {insured}
  //         </Typography>
  //       </Tooltip>
  //     )
  //   },
  // },
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
  {
    hide: false,
    field: 'tracking_code',
    headerName: t('ExTrackingCode'),
    width: 110,
    valueGetter: (params: ReturnGenerateTools<ExpenseArchivedType>) =>
      params.row.tracking_code ?? '',
  },
  {
    hide: true,
    field: 'expense_date',
    headerName: t('ExDateOfRegisterExpense'),
    width: 85,

    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
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
    hide: false,
    field: 'expense_type',
    headerName: t('ExpenseExpType'),
    width: 90,
    valueGetter: (params: ReturnGenerateTools<ExpenseArchivedType>) =>
      params.row?.expense_type?.name ?? '',
  },
  {
    hide: false,
    field: 'topic_name',
    headerName: t('ExTopicLabel'),
    width: 170,

    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
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
    hide: true,
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
    hide: false,
    field: 'adjustprice',
    headerName: t('ExAdjusterPrice'),
    width: 90,
    renderCell: (params: ReturnGenerateTools<ExpenseArchivedType>) => {
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
    field: 'expense_status',
    headerName: t('ExpenseExpStatus'),
    width: 100,
    valueGetter: (params: ReturnGenerateTools<ExpenseArchivedType>) =>
      params.row?.expense_status?.name ?? '',
  },
  // {
  //   sortable: false,
  //   disableColumnMenu: true,
  //   field: "action",
  //   hide: false,
  //   headerName: "مدیریت",
  //   width: 360,
  //   renderCell: (params) => <ArchiveExpensesActions data={params.row} />,
  // },
];
