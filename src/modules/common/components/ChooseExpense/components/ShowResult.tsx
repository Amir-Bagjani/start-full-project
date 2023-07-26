import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

//components
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import { columnDataExpenseForTransfer as columns } from '../utils';

//types
import { ExpenseType, ExpenseTypeResponse } from 'services/models';

type ShowResultProps = {
  loading: boolean;
  data?: ExpenseTypeResponse;
  page: number;
  pageSet: (n: number) => void;
};

const PageSize = 30;

export const ShowResult = ({ loading, data, page, pageSet }: ShowResultProps) => {
  const { t } = useTranslation();

  const [idsToAdd, setIdsToAdd] = useState<number[]>([]);

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('expensesToAdd', idsToAdd, { shouldDirty: true });
  }, [idsToAdd, setValue]);

  const topicCol: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        field: 'topic_name',
        headerName: t('ChTopicName'),
        width: 100,
        renderCell: (params) => {
          const name = params.row?.topic?.name ?? '';

          return (
            <Tooltip title={name}>
              <Typography noWrap>{name}</Typography>
            </Tooltip>
          );
        },
      },
    ],
    [t],
  );

  return (
    <>
      <NewDataGridTable
        loading={loading}
        rows={data?.results ?? []}
        columns={columns.concat(topicCol)}
        dataGridProps={{
          onSelectionModelChange: setIdsToAdd as any,
          selectionModel: idsToAdd,
        }}
        paginatable={(data?.count ?? 0) > PageSize}
        paginationProps={{
          currentPage: page,
          lastPage: Math.ceil((data?.count ?? 0) / PageSize),
          maxLength: 7,
          onChange: pageSet,
        }}
      />
    </>
  );
};
