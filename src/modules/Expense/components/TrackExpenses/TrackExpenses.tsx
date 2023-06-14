import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Fab,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';

//components & utils
import {
  ADMIN_R,
  EDITOR_R,
  INSURED_R,
  COUNTER_R,
  REPORTER_R,
  ADJUSTER_R,
  REGISTRAR_R,
  SUPERADJUSTER_R,
  Constants,
} from 'utils/constants';
import { MdAdd } from 'react-icons/md';
// import { TrackExpensesActions } from './TrackExpensesActions';
// import { columnsDataShowExpenses as columns } from '../../utils';
import {
  CustomTableColumn,
  NewDataGridTable,
  ReturnGenerateTools,
} from 'modules/common/components';
import { ExpenseType } from 'services/models';
import { useAllExpensesAPI } from 'modules/Expense/hooks';
import { useBrowserstorageState, useRole } from 'modules/common/hooks';
import { FilterExpeses } from './FilterExpeses';
import { TrackExpensesActions } from './TrackExpensesActions';
import { columnsDataShowExpenses as columns } from '../../utils';

//types

//type definition
export type SearchValuType = {
  province: string | number;
  expense_status: string | number;
  expense_type: string | number;
  fdate: null | string;
  tdate: null | string;
  name: string;
  topic: string | number;
};

const PageSize = 30;
const defaultValue = {
  province: '',
  expense_status: '',
  expense_type: '',
  fdate: null,
  tdate: null,
  name: '',
  topic: '',
};

const fabStyle = {
  fab: {
    position: 'fixed',
    bottom: 16,
    left: 16,
    zIndex: (theme: Theme) => theme.zIndex.speedDial,
  },
  box: { color: '#FFF', '&:hover': { color: '#FFF' } },
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const TrackExpenses = () => {
  const navigate = useNavigate();

  const [printIds, setPrintIds] = useState<number[]>([]);

  const [page, setPage] = useBrowserstorageState<number>('expense-page', 1, 'sessionStorage');
  // const [page, setPage] = useState(1);
  const [filter, filterSet] = useBrowserstorageState<SearchValuType>(
    'expense-filters',
    defaultValue,
    'sessionStorage',
  );
  // const [filter, filterSet] = useState(defaultValue);

  const { includedRole } = useRole();

  const smLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.down('smLaptop'));
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

  console.log({ expensesData, isExpensesloading });

  useEffect(() => {
    return () => setPage(1);
  }, [setPage]);

  const ids = useMemo(() => expensesData?.results.map((i) => i.id) ?? [], [expensesData?.results]);

  const wholeIdsPrint = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setPrintIds(checked ? ids : []);
    },
    [ids],
  );

  const handleIdChange = useCallback((e: ChangeEvent<HTMLInputElement>, selectId: number) => {
    setPrintIds((p) => (e.target.checked ? [...p, selectId] : p.filter((i) => i !== selectId)));
  }, []);

  const numberCol = useMemo(
    () => [
      {
        field: 'number5',
        headerName: (
          <Checkbox
            defaultValue={undefined}
            onChange={wholeIdsPrint}
            indeterminate={
              printIds.length !== (expensesData?.results?.length ?? 0) && printIds.length !== 0
            }
          />
        ),
        width: 60,
        hide: includedRole([ADMIN_R, COUNTER_R]) ? false : true,
        renderCell: (params: ReturnGenerateTools<ExpenseType>) => (
          <Checkbox
            defaultValue={undefined}
            onChange={(e) => handleIdChange(e, params.row.id)}
            checked={printIds.includes(params.row.id)}
          />
        ),
      },
      {
        field: 'number',
        headerName: 'ردیف',
        width: 45,
        renderCell: (params: ReturnGenerateTools<ExpenseType>) => {
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
    [expensesData?.results?.length, handleIdChange, includedRole, page, printIds, wholeIdsPrint],
  );

  const actionCol: any = useMemo(
    () => [
      {
        // sortable: false,
        // disableColumnMenu: true,
        hide: false,
        field: 'action',
        headerName: 'مدیریت',
        width: 190,
        renderCell: (params: ReturnGenerateTools<ExpenseType>) => (
          <TrackExpensesActions printIds={printIds} data={params.row} />
        ),
      },
    ],
    [printIds],
  );

  useMemo(() => {
    //insured and registrar should not see topic_name column
    if (includedRole([INSURED_R, REGISTRAR_R])) {
      (columns as any).find((i: any) => i.field === 'topic_name').hide = true;
    }
    // registrar should not see expense_type column
    if (includedRole([REGISTRAR_R])) {
      (columns as any).find((i: any) => i.field === 'expense_type').hide = true;
    }
    //only admin , editor and adjuster can see deductions column
    if (includedRole([ADMIN_R, EDITOR_R, ADJUSTER_R])) {
      (columns as any).find((i: any) => i.field === 'deductions').hide = false;
    }
    //only superadjuster, adjuster, coubter and reporter can see date column
    if (includedRole([ADJUSTER_R, SUPERADJUSTER_R, REPORTER_R, COUNTER_R])) {
      (columns as any).find((i: any) => i.field === 'date').hide = false;
    }
    //only admin , editor, insured and counter can see expense_status column
    if (includedRole([INSURED_R, ADMIN_R, EDITOR_R, COUNTER_R])) {
      (columns as any).find((i: any) => i.field === 'expense_status').hide = false;
    }
    //only adjuster and admin can see expense_date column
    if (includedRole([ADJUSTER_R, ADMIN_R])) {
      (columns as any).find((i: any) => i.field === 'expense_date').hide = false;
    }
    //only adjuster can see created_by column
    if (includedRole([ADJUSTER_R])) {
      (columns as any).find((i: any) => i.field === 'created_by').hide = false;
    }
  }, [includedRole]);

  return (
    <Stack spacing={2} sx={{ bgcolor: 'background.default', pt: 2, pb: 8, pl: 2 }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        {includedRole([ADMIN_R, EDITOR_R, INSURED_R, COUNTER_R]) ? (
          <>
            {smLaptop ? (
              <Fab variant='extended' sx={fabStyle.fab} color='primary' aria-label='add'>
                <Box component={Link} to='/expense/add' sx={fabStyle.box}>
                  افزودن هزینه
                  <MdAdd />
                </Box>
              </Fab>
            ) : (
              <Link to='/expense/add'>
                <Button variant='outlined' color='success' sx={{ minWidth: 'max-content' }}>
                  افزودن هزینه
                </Button>
              </Link>
            )}
          </>
        ) : null}

        <Box sx={{ width: 1 }}>
          <FilterExpeses
            loading={isExpensesloading}
            setFilter={setFilter}
            defaultValue={filter}
            pageSet={pageSet}
          />
        </Box>
      </Stack>

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
          columns={numberCol.concat(columns as any).concat(actionCol) as any}
          dataGridProps={{
            ...(expensesData?.results.length === PageSize && { height: 800 }),
            stickyHeader: true,
            checkboxSelection: false,
            onRowDoubleClick: (params) => {
              navigate(`/expense/${params.row.id}`);
            },
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
  );
};
