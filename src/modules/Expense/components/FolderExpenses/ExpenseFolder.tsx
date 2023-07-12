import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';

//components
import { AddFloderModal, FilterFolder } from './components/AddNewFolder';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import {
  Constants,
  ADJUSTER_R,
  SUPERADJUSTER_R,
  TRUSTEDDOCTOR_R,
  RECEIPTIONICT_R,
} from 'utils/constants';
import { useRole } from 'modules/common/hooks';
import { ROUTES_NAME } from 'routes/routesName';
import { useExpenseFoldersAPI } from '../../hooks';
import { columnDataExpenseFolder as column } from '../../utils';

//types
import { FolderExpenseType } from 'services/models';

export type SearchValuType = {
  name: string;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const PageSize = 30;
const defaultValue: SearchValuType = {
  name: '',
};

export const ExpenseFolder = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { includedRole } = useRole();

  const [page, setPage] = useState(1);
  const [filter, filterSet] = useState<SearchValuType>(defaultValue);

  const setFilter = useCallback((e: SearchValuType) => filterSet(e), []);
  const pageSet = useCallback((e: number) => setPage(e), []);

  const { isAdmin } = useRole();

  const { data: expenseFolders, isInitialLoading: isLoadingExpenseFolder } = useExpenseFoldersAPI(
    {
      page,
      filter,
    },
    {
      onError,
    },
  );

  const numberCol: CustomTableColumn<FolderExpenseType>[] = useMemo(
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
              <Typography fontSize={14}>{number}</Typography>
            </Tooltip>
          );
        },
      },
    ],
    [page, t],
  );

  return (
    <Stack spacing={2} sx={{ bgcolor: 'background.paper', pt: 2, pb: 8 }}>
      <Stack
        spacing={{ zero: 0, tablet: 2 }}
        alignItems='center'
        justifyContent='flex-start'
        direction='row'
      >
        {isAdmin && <AddFloderModal />}
        <FilterFolder
          loading={isLoadingExpenseFolder}
          setFilter={setFilter}
          defaultValue={defaultValue}
          pageSet={pageSet}
        />
      </Stack>

      <NewDataGridTable
        loading={isLoadingExpenseFolder}
        columns={numberCol.concat(column)}
        rows={expenseFolders?.results ?? []}
        dataGridProps={{
          onRowDoubleClick: (params) => {
            const { frist_expense_id, id } = params.row;
            if (!!frist_expense_id) {
              if (includedRole([ADJUSTER_R, SUPERADJUSTER_R, TRUSTEDDOCTOR_R, RECEIPTIONICT_R]))
                navigate(ROUTES_NAME.expense.detail, {
                  state: {
                    expenseId: frist_expense_id,
                    folderId: id,
                  },
                  // replace: true,
                });
              // else
              //   navigate(`/expense/${params.row.id}`);
            }
          },
          checkboxSelection: false,
          stickyHeader: true,
          // ...(expenseFolders?.results.length && { height: 800 }),
        }}
        paginatable={!isLoadingExpenseFolder && (expenseFolders?.count ?? 0) > PageSize}
        paginationProps={{
          currentPage: page,
          lastPage: Math.ceil((expenseFolders?.count ?? 0) / PageSize),
          maxLength: 7,
          onChange: setPage,
        }}
      />
    </Stack>
  );
};
