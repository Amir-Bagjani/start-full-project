import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { ExpenseType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

export const columnDataExpenseForTransfer: CustomTableColumn<ExpenseType>[] = [
  {
    field: 'number',
    headerName: <Trans t={t}>ChNumber</Trans>,
    width: 40,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'fullName',
    headerName: <Trans t={t}>ChNameLabel</Trans>,
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
    field: 'amount',
    headerName: <Trans t={t}>ChAmountToRial</Trans>,
    width: 100,
    valueGetter: (params) => NumberFormat.separateNum(params.row.amount),
  },
  {
    field: 'adjustprice',
    headerName: <Trans t={t}>ChAdjusterPrice</Trans>,
    width: 100,
    valueGetter: (params) => NumberFormat.separateNum(params.row.adjustprice),
  },
  {
    field: 'deductions',
    headerName: <Trans t={t}>ChDeduction</Trans>,
    width: 100,
    valueGetter: (params) => {
      const num = Number(params.row.amount) - Number(params.row.adjustprice);
      return params.row.adjustprice !== 0 ? NumberFormat.separateNum(num) : 0;
    },
  },
  {
    field: 'expense_type',
    headerName: <Trans t={t}>ChExpenseType</Trans>,
    width: 80,
    valueGetter: (params) => params.row.expense_type?.name ?? '',
  },
  {
    field: 'cost_center_type',
    headerName: <Trans t={t}>ChCostCenterType</Trans>,
    width: 80,
    valueGetter: (params) => params.row.cost_center_type?.name ?? '',
  },
  {
    field: 'expense_status',
    headerName: <Trans t={t}>ChExpenseStatus</Trans>,
    width: 120,
    valueGetter: (params) => params.row.expense_status?.name ?? '',
  },
  {
    field: 'date',
    headerName: <Trans t={t}>ChDate</Trans>,
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.date),
  },
];
