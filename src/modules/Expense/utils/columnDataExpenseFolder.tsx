import { t } from 'i18next';
import { Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat } from 'utils/helper';

//types
import { FolderExpenseType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';
import { ActionIconsFolder } from '../components/FolderExpenses/components/ExpenseFolder';

export const TypeMap: Record<string, string> = {
  0: t('ExRegisterdByCounter'),
  1: t('ExPhysicalRecivedByCounter'),
  2: t('ExRegisterdByInsured'),
  3: t('ExRegisterdByCounterAnyInsured'),
};

export const columnDataExpenseFolder: CustomTableColumn<FolderExpenseType>[] = [
  {
    field: 'name',
    headerName: t('ExName'),
    width: 250,
    renderCell: (params) => (
      <Tooltip title={params.row.name}>
        <Typography fontSize={14}>{params.row.name}</Typography>
      </Tooltip>
    ),
  },
  { field: 'folder_number', headerName: t('ExFolderNumber'), width: 70 },
  {
    field: 'type',
    headerName: t('ExFolderTyope'),
    width: 170,
    renderCell: (params) => (
      <Tooltip title={TypeMap[params.row.type] ?? ''}>
        <Typography fontSize={14}>{TypeMap[params.row.type] ?? ' - '}</Typography>
      </Tooltip>
    ),
  },
  // {
  //     field: "is_archived",
  //     headerName: "بایگانی شده؟",
  //     width: 100,
  //     valueGetter: (params) => params.row.is_archived ? "بله" : "خیر"

  // },
  {
    field: 'created_at',
    headerName: t('ExDateOfRegisterExpense'),
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.created_at),
  },
  {
    field: 'action',
    headerName: t('ExManagment'),
    width: 150,
    renderCell: (params) => <ActionIconsFolder params={params} />,
  },
];
