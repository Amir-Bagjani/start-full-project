import { t } from 'i18next';
import { Tooltip, Typography } from '@mui/material';

//util
import { DateFormat } from 'utils/helper';

//types
import { ContractWaitingListType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

export const columnsDataWaitingPeriod: CustomTableColumn<ContractWaitingListType>[] = [
  {
    field: 'number',
    headerName: t('DeNumber'),
    width: 60,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'illness_name',
    headerName: t('DeTopic'),
    width: 260,
    renderCell: (params) => (
      <Tooltip title={params.row.illness_name}>
        <Typography fontSize={14} noWrap>
          {params.row.illness_name}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: 'created_at',
    headerName: t('DeCreatedDate'),
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.created_at),
  },
];
