import { t } from 'i18next';
import { Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { InsuredExpenseHistoryType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

export const columnsDataInsuredExpenseHistory: CustomTableColumn<InsuredExpenseHistoryType>[] = [
  {
    field: 'number',
    headerName: t('DeNumber'),
    width: 50,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'fullName',
    headerName: t('DeNameAndFullname'),
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
              <Typography noWrap color='grey.500' className='hover-show' sx={{ display: 'none' }}>
                {insured}
              </Typography>
              <Typography noWrap>{dependant}</Typography>
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
    field: 'national_code',
    headerName: t('DeNationalNumber'),
    width: 100,
    renderCell: (params) => {
      const insuredNationalcode = params.row.insured.user.profile.national_code;
      const dependantNationalcode = params.row?.dependant?.nationalcode;

      return dependantNationalcode ?? insuredNationalcode;
    },
  },
  {
    field: 'tracking_code',
    headerName: t('DeTrackingCode'),
    width: 110,
    valueGetter: (params) => params.row.tracking_code ?? '',
  },
  {
    field: 'expense_date',
    headerName: t('DeCreatedDate'),
    width: 85,

    renderCell: (params) => {
      const { created_at } = params.row;

      const date = DateFormat.fPersianDate(created_at);
      const dateTime = DateFormat.fPersianDateTime(created_at);

      return (
        <Tooltip title={t('DeDateAndTime') + ':' + dateTime}>
          <Typography>{date}</Typography>
        </Tooltip>
      );
    },
  },
  // {
  //   field: "date",
  //   headerName: "تاریخ هزینه",
  //   width: 85,

  //   renderCell: (params) => {
  //     const { date } = params.row;

  //     const Expensedate = DateFormat.fPersianDate(date);
  //     const ExpensedateTime = DateFormat.fPersianDateTime(date);

  //     return (
  //       <Tooltip title={` زمان و تاریخ : ${ExpensedateTime}`}>
  //         <Typography fontSize={14}>{Expensedate}</Typography>
  //       </Tooltip>
  //     );
  //   },
  // },
  // {
  //   field: "created_by",
  //   headerName: "کاربر ثبت کننده",
  //   width: 140,

  //   renderCell: (params) => {
  //     const { first_name = "", last_name = "" } = params.row.created_by.profile;

  //     return (
  //       <Tooltip title={first_name + " " + last_name}>
  //         <Typography fontSize={14}>{first_name + " " + last_name}</Typography>
  //       </Tooltip>
  //     );
  //   },
  // },
  {
    field: 'expense_type',
    headerName: t('DeExpense'),
    width: 90,
    valueGetter: (params) => params.row?.expense_type?.name ?? '',
  },
  {
    field: 'topic_name',
    headerName: t('DeTopic'),
    width: 100,

    renderCell: (params) => {
      const name = params.row?.topic?.name ?? '';

      return (
        <Tooltip title={name}>
          <Typography noWrap>{name}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'amount',
    headerName: t('DeAmountInRials'),
    width: 90,
    renderCell: (params) => {
      const { amount } = params.row;

      return (
        <Tooltip
          title={!!amount ? `${NumberFormat.numberToText(amount / 10)} ${t('DeToman')}` : ''}
        >
          <Typography>{NumberFormat.separateNum(amount ?? 0)}</Typography>
        </Tooltip>
      );
    },
  },
  // {
  //   field: "deductions",
  //   headerName: "کسورات",
  //   description: "مبلغ اعلامی - مبلغ پرداختی",
  //   sortable: false,
  //   width: 80,
  //   renderCell: (params) => {
  //     const deductions =
  //       Number(params.row.amount) - Number(params.row.adjustprice);

  //     return (
  //       <Tooltip title={`${NumberFormat.numberToText(deductions / 10)} تومان`}>
  //         <Typography fontSize={14}>
  //           {params.row.adjustprice !== 0
  //             ? NumberFormat.separateNum(deductions)
  //             : 0}
  //         </Typography>
  //       </Tooltip>
  //     );
  //   },
  // },
  {
    field: 'adjustprice',
    headerName: t('DeAdjusterPrice'),
    width: 90,
    renderCell: (params) => {
      const { adjustprice } = params.row;

      return (
        <Tooltip title={adjustprice ? +NumberFormat.numberToText(adjustprice / 10) + 'تومان' : ''}>
          <Typography>{adjustprice ? NumberFormat.separateNum(adjustprice) : '-'}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'expense_status',
    headerName: t('DeStatus'),
    width: 100,
    valueGetter: (params) => params.row?.expense_status?.name ?? '',
  },
];
