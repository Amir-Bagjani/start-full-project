import { t } from 'i18next';

//components

//utils
import { DateFormat } from 'utils/helper';

//types
import { TransferType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';
import { ActionIconsTransferList } from '../components/ShowTransferList';

export const columnDataTransferList: CustomTableColumn<TransferType>[] = [
  {
    field: 'number',
    headerName: t('TrNumber'),
    width: 60,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  { field: 'title', headerName: t('TrCaseNumber'), width: 190 },
  {
    field: 'date',
    headerName: t('TrDate'),
    width: 100,
    valueGetter: (params) => (params.row.date ? DateFormat.fPersianDate(params.row.date) : ''),
  },
  {
    field: 'created_at',
    headerName: t('TrCreatedDate'),
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.created_at),
  },
  {
    field: 'archive',
    headerName: t('TrIsArchived'),
    width: 100,
    valueGetter: (params) => (params.row.is_archived ? t('TrYes') : t('TrNo')),
  },
  {
    field: 'action',
    headerName: t('TrAction'),
    width: 150,
    renderCell: (params) => <ActionIconsTransferList params={params} />,
  },
];
