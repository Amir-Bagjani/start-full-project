import { t } from 'i18next';
import { memo } from 'react';
import { blueGrey } from '@mui/material/colors';
import { IconButton, Tooltip } from '@mui/material';

//components
import { GiCancel } from 'react-icons/gi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import { columnDataEvaluationAdjustList } from 'modules/common/components/EvaluationDetail/utils';

//types
import type { EvaluationDetailType } from 'services/models';

type FanavaranDetailProps = {
  data: any;
};

// import { NewDataGridTable } from "components/shared";
// import { columnDataEvaluationAdjustList } from "features/EvaluationDetail/utils";

export const FanavaranDetail = memo(({ data }: FanavaranDetailProps) => {
  return (
    <NewDataGridTable
      columns={columnDataEvaluationAdjustList.concat(actionColumn)}
      rows={data ?? []}
      loading={false}
      dataGridProps={{
        checkboxSelection: false,
      }}
    />
  );
});

const actionColumn: CustomTableColumn<EvaluationDetailType>[] = [
  {
    field: 'action',
    headerName: t('TrAction'),
    width: 80,
    renderCell: (params) => {
      console.log(params.row);
      const { dmg_case_id, fanavan_error } = params.row;
      const hide = !dmg_case_id && !fanavan_error; //if both of them were null, do not show anything

      return !hide ? (
        <Tooltip title={fanavan_error ? fanavan_error : dmg_case_id}>
          <IconButton sx={{ color: blueGrey[200] }}>
            {fanavan_error ? <GiCancel /> : <FaRegCheckCircle />}
          </IconButton>
        </Tooltip>
      ) : null;
    },
  },
];
