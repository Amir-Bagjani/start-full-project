import { toast } from 'react-hot-toast';
import { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';

//components
import { FilterArchiveExpenses } from './FilterArchiveExpenses';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import { Constants, INSURED_R, REGISTRAR_R } from 'utils/constants';
import { useExpenseArchiveTableAPI, useRole } from 'modules/common/hooks';
import { columnsDataArchiveExpenses as columns } from 'modules/Expense/utils';

//type
import { ExpenseArchivedType } from 'services/models';

export type SearchValuType = {
  province: string | number;
  expense_status_code: string | number;
  name: string;
};

const defaultValue: SearchValuType = {
  province: '',
  name: '',
  expense_status_code: '',
};
const PageSize = 30;

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const ArchiveExpenses = () => {
  const [page, setPage] = useState(1);
  const [filter, filterSet] = useState<SearchValuType>(defaultValue);

  const { includedRole } = useRole();

  const setFilter = useCallback((e: SearchValuType) => filterSet(e), []);
  const pageSet = useCallback((e: number) => setPage(e), []);

  const { data: expensesData, isInitialLoading: isExpensesloading } = useExpenseArchiveTableAPI(
    {
      page,
      filter,
    },
    {
      keepPreviousData: true,
      onError,
    },
  );

  const numberCol: CustomTableColumn<ExpenseArchivedType>[] = useMemo(
    () => [
      {
        field: 'number',
        headerName: 'ردیف',
        width: 45,
        renderCell: (params) => {
          const number =
            params.api.getRowIndex(params.row.id) + 1 + (page > 1 ? (page - 1) * 30 : 0);
          return (
            <Tooltip title={number}>
              <Typography fontSize={14}>{number}</Typography>
            </Tooltip>
          );
        },
      },
    ],
    [page],
  );

  useMemo(() => {
    //insured and registrar should not see topic_name and expense_type columns
    if (includedRole([INSURED_R, REGISTRAR_R])) {
      columns.find((i) => i.field === 'topic_name')!.hide = true;
      columns.find((i) => i.field === 'expense_type')!.hide = true;
    }
  }, [includedRole]);

  return (
    <Stack spacing={2} sx={{ bgcolor: 'background.paper', pt: 2 }}>
      <FilterArchiveExpenses
        loading={isExpensesloading}
        setFilter={setFilter}
        defaultValue={defaultValue}
        pageSet={pageSet}
      />

      <Box
        sx={{
          '& tr.MuiTableRow-root:hover': {
            'td p.hover-show': {
              display: 'block',
            },
          },
        }}
      >
        <NewDataGridTable
          loading={isExpensesloading}
          rows={expensesData?.results ?? []}
          columns={numberCol.concat(columns)}
          dataGridProps={{
            checkboxSelection: false,
            stickyHeader: true,
            height: 800,
          }}
          paginatable
          paginationProps={{
            currentPage: page,
            lastPage: Math.ceil((expensesData?.count ?? 0) / PageSize),
            maxLength: 7,
            onChange: setPage,
          }}
        />
      </Box>
    </Stack>
  );
};
