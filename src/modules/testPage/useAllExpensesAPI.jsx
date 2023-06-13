import { IconButton, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { MdAdd } from 'react-icons/md';
import { APIs } from 'services/APIs';
import { object, string, number } from 'yup';

export const ALL_EXPENSES = 'ALL_EXPENSES';

export const useAllExpensesAPI = (params, options = {}) => {
  return useQuery({
    queryKey: [ALL_EXPENSES, params],
    queryFn: () => APIs.expense.getAllExpenses(params),
    ...options,
  });
};

// import { DateFormat } from "utils/date";
// import { NumberFormat } from "utils/number";
// import { TrackExpensesActions } from "../components/TrackExpenses";

export const columnsDataShowExpenses = [
  {
    field: 'fullName',
    headerName: 'نام و نام خانوادگی',
    description: 'نمایش نام و نام خانوادگی',
    sortable: false,
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
          <Typography fontSize={14} noWrap>
            {insured}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'national_code',
    headerName: 'کد ملی',
    width: 100,
    renderCell: (params) => {
      const insuredNationalcode = params.row.insured.user.profile.national_code;
      const dependantNationalcode = params.row?.dependant?.nationalcode;

      return dependantNationalcode ?? insuredNationalcode;
    },
  },
  {
    field: 'tracking_code',
    headerName: 'کد پیگیری',
    width: 110,
    valueGetter: (params) => params.row.tracking_code ?? '',
  },
  {
    field: 'expense_date',
    headerName: 'تاریخ ثبت',
    width: 85,

    renderCell: (params) => {
      const { created_at } = params.row;

      //   const date = DateFormat.fPersianDate(created_at)
      //   const dateTime = DateFormat.fPersianDateTime(created_at)

      return (
        <Tooltip title={` زمان و تاریخ : ${created_at}`}>
          <Typography fontSize={14}>{created_at}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'date',
    headerName: 'تاریخ هزینه',
    width: 85,

    renderCell: (params) => {
      const { date } = params.row;

      //   const Expensedate = DateFormat.fPersianDate(date)
      //   const ExpensedateTime = DateFormat.fPersianDateTime(date)

      return (
        <Tooltip title={` زمان و تاریخ : ${date}`}>
          <Typography fontSize={14}>{date}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'created_by',
    headerName: 'کاربر ثبت کننده',
    width: 140,

    renderCell: (params) => {
      const { first_name = '', last_name = '' } = params.row.created_by.profile;

      return (
        <Tooltip title={first_name + ' ' + last_name}>
          <Typography fontSize={14}>{first_name + ' ' + last_name}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'expense_type',
    headerName: 'هزینه',
    width: 90,
    valueGetter: (params) => params.row?.expense_type?.name ?? '',
  },
  {
    field: 'topic_name',
    headerName: 'بیماری',
    width: 100,

    renderCell: (params) => {
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
    field: 'amount',
    headerName: 'مبلغ (ریال)',
    width: 90,
    renderCell: (params) => {
      const { amount = '' } = params.row;

      return (
        <Tooltip title={`${amount} تومان`}>
          <Typography fontSize={14}>
            {amount}
            {/* {NumberFormat.separateNum(amount)} */}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'deductions',
    headerName: 'کسورات',
    description: 'مبلغ اعلامی - مبلغ پرداختی',
    sortable: false,
    width: 80,
    renderCell: (params) => {
      const deductions = Number(params.row.amount) - Number(params.row.adjustprice);

      return (
        <Tooltip title={`${deductions} تومان`}>
          <Typography fontSize={14}>{params.row.adjustprice !== 0 ? deductions : 0}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'adjustprice',
    headerName: 'مبلغ پرداختی',
    width: 90,
    renderCell: (params) => {
      const { adjustprice } = params.row;

      return (
        <Tooltip title={`${adjustprice} تومان`}>
          <Typography fontSize={14}>{adjustprice}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'expense_status',
    headerName: 'وضعیت',
    width: 100,
    valueGetter: (params) => params.row?.expense_status?.name ?? '',
  },
  {
    field: 'action',
    headerName: 'مدیریت',
    width: 100,
    renderCell: (params) => (
      <IconButton>
        <MdAdd />
      </IconButton>
    ),
  },
];

export const addNewAgencyValidation = object({
  name: string().required('نام را وارد کنید'),
  code: string().required('کد را وارد کنید'),
  province: number().typeError('استان را وارد کنید').required('استان را وارد کنید'),
  city: number().typeError('شهر را وارد کنید').required('شهر را وارد کنید'),
  agency_type: number().typeError('نوع را وارد کنید').required('نوع را وارد کنید'),
  phone_number: string()
    .required('شماره تلفن را وارد کنید')
    .matches(/^[0-9]+$/, 'عدد وارد کنید')
    .min(8, 'حداقل 8 رقم')
    .max(11, 'حداکثر 11 رقم'),
  latitude: string()
    .required('طول جغرافیایی را وارد کنید')
    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/, 'فرمت اشتباه است'),
  longitude: string()
    .required('عرض جغرافیایی را وارد کنید')
    .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/, 'فرمت اشتباه است'),
  description: string().notRequired(),
  address: string().required('آدرس را وارد کنید'),
  fdate: string().nullable().required('تاریخ شروع را وارد کنید'),
  tdate: string().nullable().required('تاریخ پایان را وارد کنید'),
});
