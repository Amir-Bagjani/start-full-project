import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useCallback, useState, useMemo } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';

//components
import { SearchAggregationForm } from './SearchAggregationForm';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { useAggregationTransferAPI } from '../../hooks';
import { columnDataExpenseForTransfer as columns } from 'modules/common/components/ChooseExpense/utils';

//types
import { ExpenseType } from 'services/models';

type ChooseAggregationTransferProps = {
  id: number;
  handleClose: () => void;
};
// import { SearchAggregationForm } from "./SearchAggregationForm";

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const PageSize = 30;

export const ChooseAggregationTransfer = ({ id, handleClose }: ChooseAggregationTransferProps) => {
  const { t } = useTranslation();

  const [page, pageSet] = useState(1);

  const [trigger, setTrigger] = useState(0);
  const [idsToAdd, setIdsToAdd] = useState<number[]>([]);

  const { getValues } = useFormContext();

  const invalidateQuery = useCallback(() => setTrigger((p) => p + 1), []);

  const { data: aggregationTransfer, isInitialLoading: isAggregationTransferLoading } =
    useAggregationTransferAPI(
      {
        page,
        transfer: id,
        name: getValues().name,
        user: getValues().user,
        fdate: DateFormat.getDate(getValues('fdate')),
        tdate: DateFormat.getDate(getValues('tdate')),
        trigger, //this is for skip stale data :/
      },
      {
        keepPreviousData: true,
        onError,
      },
    );

  const topicCol: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        field: 'topic_name',
        headerName: t('TrTopic'),
        width: 100,

        renderCell: (params) => {
          const name = params.row?.topic?.name ?? '';

          return (
            <Tooltip title={name}>
              <Typography noWrap fontSize={14}>
                {name}
              </Typography>
            </Tooltip>
          );
        },
      },
    ],
    [t],
  );

  return (
    <Stack spacing={2}>
      <SearchAggregationForm
        id={id}
        idsToAdd={idsToAdd}
        handleClose={handleClose}
        invalidateQuery={invalidateQuery}
        loading={isAggregationTransferLoading}
      />

      <NewDataGridTable
        loading={isAggregationTransferLoading}
        rows={aggregationTransfer?.results ?? []}
        columns={columns.concat(topicCol)}
        dataGridProps={{
          onSelectionModelChange: setIdsToAdd as any,
          selectionModel: idsToAdd,
        }}
        paginatable={(aggregationTransfer?.count ?? 0) > PageSize}
        paginationProps={{
          currentPage: page,
          lastPage: Math.ceil((aggregationTransfer?.count ?? 0) / PageSize),
          maxLength: 7,
          onChange: pageSet,
        }}
      />
    </Stack>
  );
};
