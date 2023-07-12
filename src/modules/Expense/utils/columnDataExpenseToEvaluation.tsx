import { t } from 'i18next';
import { red, teal } from '@mui/material/colors';
import { Stack, Tooltip, Typography } from '@mui/material';

//components
import { MdCheckCircleOutline, MdOutlineCancel } from 'react-icons/md';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { SingleFolderExpenseResponse } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

type Data = SingleFolderExpenseResponse['expenses'];

export const columnDataExpenseToEvaluation: CustomTableColumn<Data>[] = [
  {
    field: 'number',
    headerName: t('ExNumber'),
    width: 45,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
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
  //   field: "fullName",
  //   headerName: "نام و نام خانوادگی",
  //   description: "نمایش نام و نام خانوادگی",
  //   sortable: false,
  //   width: 140,
  //   renderCell: (params) => {
  //     const insured = params.row.insured
  //       ? params.row.insured.user?.profile?.first_name +
  //       " " +
  //       params.row.insured.user?.profile?.last_name
  //       : "";
  //     const dependant = params.row.dependant
  //       ? params.row.dependant?.first_name +
  //       " " +
  //       params.row.dependant?.last_name
  //       : "";

  //     if (!!dependant)
  //       return (
  //         <Tooltip title={dependant}>
  //           <>
  //             <Typography
  //               noWrap
  //               color="grey.500"
  //               className="hover-show"
  //               sx={{ display: "none", fontSize: "12px !important" }}
  //             >
  //               {insured}
  //             </Typography>
  //             <Typography fontSize={14} noWrap>
  //               {dependant}
  //             </Typography>
  //           </>
  //         </Tooltip>
  //       );

  //     return (
  //       <Tooltip title={insured}>
  //         <Typography fontSize={14} noWrap>
  //           {insured}
  //         </Typography>
  //       </Tooltip>
  //     );
  //   },
  // },
  {
    field: 'amount',
    headerName: t('ExAmountToRial'),
    width: 90,
    renderCell: (params) => {
      const { amount = 0 } = params.row;

      return (
        <Tooltip title={`${NumberFormat.numberToText(amount / 10)} ${t('ExToman')}`}>
          <Typography fontSize={14}>{NumberFormat.separateNum(amount)}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'deductions',
    headerName: t('ExDeduction'),
    width: 80,
    renderCell: (params) => {
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
    field: 'deductions',
    headerName: t('ExDeduction'),
    width: 80,
    renderCell: (params) => {
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
    valueGetter: (params) => params.row?.expense_type?.name ?? '',
  },
  {
    field: 'cost_center_type',
    headerName: t('ExpenseExpCostCenterType'),
    width: 80,
    valueGetter: (params) => params.row.cost_center_type?.name ?? '',
  },
  {
    field: 'expense_status',
    headerName: t('ExpenseExpStatus'),
    width: 100,
    valueGetter: (params) => params.row?.expense_status?.name ?? '',
  },
  {
    field: 'date',
    headerName: t('ExDateOfExpense'),
    width: 85,

    renderCell: (params) => {
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
    field: 'adjustment_done',
    headerName: t('ExAdjusted'),
    width: 100,
    renderCell: (params) => {
      return (params.row as any).expense_adjusts.length > 0 ? (
        <MdCheckCircleOutline color={teal[200]} size={24} />
      ) : (
        <MdOutlineCancel color={red[200]} size={24} />
      );
    },
  },
];
