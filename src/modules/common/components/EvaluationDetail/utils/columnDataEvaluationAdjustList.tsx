//components
import { t } from 'i18next';
import { Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { CustomTableColumn } from '../../Table';
import { EvaluationDetailType } from 'services/models';

export const columnDataEvaluationAdjustList: CustomTableColumn<EvaluationDetailType>[] = [
  {
    field: 'ktable',
    headerName: t('EvaKtable'),
    width: 300,
    renderCell: (params) => {
      const { code_description } = params.row?.ktable;
      return (
        <Tooltip title={code_description}>
          <Typography>{code_description}</Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'amount',
    headerName: t('EvaAmountRial'),
    width: 100,
    valueGetter: (params) => NumberFormat.separateNum(params.row.amount),
  },
  {
    field: 'franchise',
    headerName: t('EvaFranchise'),
    width: 100,
    valueGetter: (params) =>
      params.row.franchise ? NumberFormat.separateNum(params.row.franchise) : t('EvaFranNo'),
  },
  {
    field: 'has_base_insurance',
    headerName: t('EvaBaseInsurance'),
    width: 100,
    valueGetter: (params) => (params.row.has_base_insurance ? t('EvaFranYes') : t('EvaFranNo')),
  },
  {
    field: 'created_at',
    headerName: t('EvaCreatedAt'),
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.created_at),
  },
  {
    field: 'comments',
    headerName: t('EvaComments'),
    width: 300,
    renderCell: (params) => {
      const { comments } = params.row;
      return (
        <Tooltip title={comments ?? ''}>
          <Typography noWrap>{comments ?? '-'}</Typography>
        </Tooltip>
      );
    },
  },
];
