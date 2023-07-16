import { t } from 'i18next';
import { MdDownload } from 'react-icons/md';
import { Tooltip, Typography } from '@mui/material';

//utils
import { DateFormat } from 'utils/helper';

//types
import { ContractAddendumType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

export const columnsDataAddendum: CustomTableColumn<ContractAddendumType>[] = [
  {
    field: 'number',
    headerName: t('DeNumber'),
    width: 60,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'title',
    headerName: t('DeTitle'),
    width: 260,
    renderCell: (params) => (
      <Tooltip title={params.row.title}>
        <Typography fontSize={14} noWrap>
          {params.row.title}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: 'from_date',
    headerName: t('DeStartDate'),
    width: 100,
    valueGetter: (params) => {
      const { from_date } = params.row;
      return <Typography>{DateFormat.fPersianDate(from_date) ?? '-'}</Typography>;
    },
  },
  {
    field: 'to_date',
    headerName: t('DeEndDate'),
    width: 100,
    valueGetter: (params) => {
      const { to_date } = params.row;
      return <Typography>{DateFormat.fPersianDate(to_date) ?? '-'}</Typography>;
    },
  },
  {
    field: 'file',
    headerName: t('DeFile'),
    width: 100,
    renderCell: (params) => {
      const onClick = (e: any) => {
        // e.stopPropagation();
      };

      return (
        <>
          <a href={params.row.file} target='_blank' rel='noopener noreferrer' onClick={onClick}>
            <MdDownload />
          </a>
        </>
      );
    },
  },
  {
    field: 'created_at',
    headerName: t('DeCreatedDate'),
    width: 100,
    valueGetter: (params) => {
      const { created_at } = params.row;
      return <Typography>{DateFormat.fPersianDate(created_at) ?? '-'}</Typography>;
    },
  },
];
