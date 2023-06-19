//components
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import { CustomTableColumn } from '../../Table';
import { EvaluationDetailType } from 'services/models';

export const columnDataEvaluationAdjustList: CustomTableColumn<EvaluationDetailType>[] = [
  {
    field: 'ktable',
    headerName: <Trans t={t}>EvaKtable</Trans>,
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
    headerName: <Trans t={t}>EvaAmountRial</Trans>,
    width: 100,
    valueGetter: (params) => NumberFormat.separateNum(params.row.amount),
  },
  {
    field: 'franchise',
    headerName: <Trans t={t}>EvaFranchise</Trans>,
    width: 100,
    valueGetter: (params) =>
      params.row.franchise ? (
        NumberFormat.separateNum(params.row.franchise)
      ) : (
        <Trans t={t}>EvaFranNo</Trans>
      ),
  },
  {
    field: 'has_base_insurance',
    headerName: <Trans t={t}>EvaBaseInsurance</Trans>,
    width: 100,
    valueGetter: (params) =>
      params.row.has_base_insurance ? (
        <Trans t={t}>EvaFranYes</Trans>
      ) : (
        <Trans t={t}>EvaFranNo</Trans>
      ),
  },
  {
    field: 'created_at',
    headerName: <Trans t={t}>EvaCreatedAt</Trans>,
    width: 100,
    valueGetter: (params) => DateFormat.fPersianDate(params.row.created_at),
  },
  {
    field: 'comments',
    headerName: <Trans t={t}>EvaComments</Trans>,
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
