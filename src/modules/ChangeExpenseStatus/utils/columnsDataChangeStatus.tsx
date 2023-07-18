import { t } from 'i18next';
import { Stack, Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat } from 'utils/helper';

//types
import { ExpenseType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

export const columnsDataChangeStatus: CustomTableColumn<ExpenseType>[] = [
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
                <Typography noWrap>{dependant}</Typography>
              </>
            </Tooltip>
            <Typography noWrap>{dependantNationalcode}</Typography>
          </Stack>
        );

      return (
        <Stack spacing={0}>
          <Tooltip title={insured}>
            <Typography noWrap>{insured}</Typography>
          </Tooltip>
          <Typography noWrap>{insuredNationalcode}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'tracking_code',
    headerName: t('ExTrackingCode'),
    width: 110,
    valueGetter: (params) => params.row.tracking_code ?? '',
  },
  {
    field: 'expense_date',
    headerName: t('ExDateOfRegisterExpense'),
    width: 100,

    renderCell: (params) => {
      const { created_at, date } = params.row;

      const create_date = DateFormat.fPersianDate(created_at);
      const create_dateTime = DateFormat.fPersianDateTime(created_at);

      const Expensedate = DateFormat.fPersianDate(date);
      const ExpensedateTime = DateFormat.fPersianDateTime(date);

      return (
        <Stack spacing={1}>
          <Tooltip title={` ${t('ExDateAndTime')} : ${ExpensedateTime}`}>
            <Stack direction='row'>
              <Typography>{t('ExExpense')} : </Typography>
              <Typography>{Expensedate}</Typography>
            </Stack>
          </Tooltip>
          <Tooltip title={` ${t('ExDateAndTime')} : ${create_dateTime}`}>
            <Stack direction='row'>
              <Typography>{t('ExRegister')} : </Typography>
              <Typography>{create_date}</Typography>
            </Stack>
          </Tooltip>
        </Stack>
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
    field: 'topic_name',
    headerName: t('ExTopicLabel'),
    width: 150,

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
    field: 'transfer',
    headerName: t('ExTrnsferList'),
    width: 90,
    renderCell: (params) => {
      const { transfer } = params.row;

      if (transfer?.title)
        return (
          <Tooltip title={transfer?.title}>
            <Stack spacing={1}>
              <Typography>{t('ExHas')}</Typography>
              <Typography>{transfer?.title}</Typography>
            </Stack>
          </Tooltip>
        );

      return <Typography>{t('ExHasNot')}</Typography>;
    },
  },
  {
    field: 'expense_status',
    headerName: t('ExpenseExpStatus'),
    width: 110,
    valueGetter: (params) => params.row?.expense_status?.name ?? '',
  },
];
