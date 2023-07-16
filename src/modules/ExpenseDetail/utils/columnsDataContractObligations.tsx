import { t } from 'i18next';
import { Tooltip, Typography } from '@mui/material';
import { ContractObligationType } from 'services/models';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { CustomTableColumn } from 'modules/common/components';

export const columnsDataContractObligations: CustomTableColumn<ContractObligationType>[] = [
  {
    field: 'number',
    headerName: t('DeNumber'),
    width: 60,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'name',
    headerName: t('DeName'),
    width: 260,
    renderCell: (params) => (
      <Tooltip title={params.row.name}>
        <Typography noWrap>{params.row.name}</Typography>
      </Tooltip>
    ),
  },
  {
    field: 'max_payment',
    headerName: t('DeMaxPayment'),
    width: 160,
    renderCell: (params) => {
      const { max_payment } = params.row;
      return <Typography>{NumberFormat.separateNum(max_payment)}</Typography>;
    },
  },
  {
    field: 'created_at',
    headerName: t('DeCreatedDate'),
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.created_at),
  },
];
