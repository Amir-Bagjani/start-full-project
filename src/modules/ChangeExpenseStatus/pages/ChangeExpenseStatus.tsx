import { toast } from 'react-hot-toast';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Tooltip, Container, Typography, useMediaQuery } from '@mui/material';

//components
import { FilterExpeses } from 'modules/Expense/components/TrackExpenses';
import { CustomTableColumn, DocumentTitle, NewDataGridTable } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useAllExpensesAPI } from 'modules/Expense/hooks';
import { columnsDataChangeStatus as columns } from '../utils';

//types
import { ExpenseType } from 'services/models';
import { ChangeExpenseStatusActions, ChangeGroupStatus } from '../components';

type SearchValuType = {
  province: string | number;
  expense_status: string | number;
  expense_type: string | number;
  insurancepolicy: string | number;
  fdate: null | string;
  tdate: null | string;
  name: string;
  topic: string | number;
  contract: string | number;
  has_transfer: string;
};

const PageSize = 30;
const defaultValue: SearchValuType = {
  province: '',
  expense_status: '',
  insurancepolicy: '',
  expense_type: '',
  fdate: null,
  tdate: null,
  name: '',
  topic: '',
  contract: '',
  has_transfer: '',
};
const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const ChangeExpenseStatus = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [filter, filterSet] = useState(defaultValue);

  const [expenses, setExpenses] = useState<number[]>([]);

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('mobile'));

  const setFilter = useCallback((e: SearchValuType) => filterSet(e), [filterSet]);
  const pageSet = useCallback((e: number) => setPage(e), [setPage]);

  const { data: expensesData, isInitialLoading: isExpensesloading } = useAllExpensesAPI(
    {
      page,
      filter,
    },
    {
      keepPreviousData: true,
      onError,
    },
  );

  const numberCol: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        field: 'number',
        headerName: t('ExNumber'),
        width: 45,
        renderCell: (params) => {
          const number =
            params.api.getRowIndex(params.row.id) + 1 + (page > 1 ? (page - 1) * 30 : 0);
          return (
            <Tooltip title={number}>
              <Typography>{number}</Typography>
            </Tooltip>
          );
        },
      },
    ],
    [page, t],
  );
  const actionCol: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        hide: false,
        field: 'action',
        headerName: t('ExComments'),
        width: 250,
        renderCell: (params) => (
          <Stack spacing={0}>
            <Tooltip title={params.row.description || ''}>
              <Typography noWrap>{params.row.description?.trim() || '-'}</Typography>
            </Tooltip>
            <ChangeExpenseStatusActions data={params.row} />
          </Stack>
        ),
      },
    ],
    [t],
  );

  return (
    <DocumentTitle title={t('ExChangeStatus') as string}>
      <Container>
        <Stack spacing={2} sx={{ pt: 2, pb: 8 }}>
          <Box sx={{ width: 1 }}>
            <FilterExpeses
              loading={isExpensesloading}
              setFilter={setFilter}
              defaultValue={filter}
              pageSet={pageSet}
            />
          </Box>

          <ChangeGroupStatus id={expenses} />

          <Box
            sx={{
              '& tr.MuiTableRow-root:hover': {
                //show main insurer if target was independant
                'td p.hover-show': {
                  display: 'block',
                },
              },
            }}
          >
            <NewDataGridTable
              loading={isExpensesloading}
              rows={expensesData?.results ?? []}
              columns={numberCol.concat(columns).concat(actionCol)}
              dataGridProps={{
                stickyHeader: true,
                keepNonExistentRowsSelected: true,
                selectionModel: expenses,
                onSelectionModelChange: setExpenses as (n: any[]) => void,
              }}
              paginatable={!isExpensesloading && (expensesData?.count ?? 0) > PageSize}
              paginationProps={{
                currentPage: page,
                lastPage: Math.ceil((expensesData?.count ?? 0) / PageSize),
                maxLength: mobile ? 5 : 7,
                onChange: setPage,
              }}
            />
          </Box>
        </Stack>
      </Container>
    </DocumentTitle>
  );
};

export default ChangeExpenseStatus;
