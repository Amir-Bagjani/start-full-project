import { Tooltip, Typography } from '@mui/material';

//type
import { AgencyType } from 'services/models';
import { CustomTableColumn } from 'modules/common/components';

export const columnsDataAgencies: CustomTableColumn<AgencyType>[] = [
  {
    field: 'number',
    headerName: 'ردیف',
    width: 50,
    renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
  },
  {
    field: 'name',
    headerName: 'نام مرکز',
    width: 130,
    renderCell: (params) => {
      const { name } = params.row;
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
    field: 'province',
    headerName: 'استان',
    width: 140,
    valueGetter: (params) => params.row.province.name ?? '',
  },
  {
    field: 'city',
    headerName: 'شهر',
    width: 110,
    valueGetter: (params) => params.row.city.name ?? '',
  },
  {
    field: 'address',
    headerName: 'آدرس مرکز',
    width: 200,
    renderCell: (params) => {
      const { address } = params.row;
      return (
        <Tooltip title={address}>
          <Typography noWrap fontSize={14}>
            {address}
          </Typography>
        </Tooltip>
      );
    },
  },
];
