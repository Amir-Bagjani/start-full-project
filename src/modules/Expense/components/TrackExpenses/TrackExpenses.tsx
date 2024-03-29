import {
  Box,
  Fab,
  Stack,
  Theme,
  Button,
  Tooltip,
  Checkbox,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

//components
import {
  ADMIN_R,
  EDITOR_R,
  INSURED_R,
  COUNTER_R,
  Constants,
  REPORTER_R,
  ADJUSTER_R,
  REGISTRAR_R,
  SUPERADJUSTER_R,
  TRUSTEDDOCTOR_R,
  RECEIPTIONICT_R,
} from 'utils/constants';
import {
  NewDataGridTable,
  CustomTableColumn,
  ReturnGenerateTools,
} from 'modules/common/components';
import { MdAdd } from 'react-icons/md';
import { FilterExpeses } from './FilterExpeses';
import { TrackExpensesActions } from './TrackExpensesActions';

//utils
import { useAllExpensesAPI } from 'modules/Expense/hooks';
import { columnsDataShowExpenses as columns } from '../../utils';
import { useBrowserstorageState, useRole } from 'modules/common/hooks';

//types
import { ExpenseType } from 'services/models';
import { ROUTES_NAME } from 'routes/routesName';

//type definition
export type SearchValuType = {
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
const fabStyle = {
  fab: {
    position: 'fixed',
    bottom: 16,
    left: 16,
    zIndex: (theme: Theme) => theme.zIndex.speedDial,
  },
  box: { color: '#FFF', '&:hover': { color: '#FFF' } },
} as const;

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const pageChecker = (value: number) => {
  if (typeof value === 'number' && value > 0) return value;
  return 1;
};

const searchChecker = (value: SearchValuType) => {
  if (
    typeof value === 'object' &&
    Object.keys(defaultValue).every((property) => value.hasOwnProperty(property))
  )
    return value;

  return defaultValue;
};

export const TrackExpenses = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [printIds, setPrintIds] = useState<number[]>([]);

  const [page, setPage] = useBrowserstorageState<number>(
    'expense-page',
    1,
    'sessionStorage',
    pageChecker,
  );
  // const [page, setPage] = useState(1);
  const [filter, filterSet] = useBrowserstorageState<SearchValuType>(
    'expense-filters',
    defaultValue,
    'sessionStorage',
    searchChecker,
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

  // useEffect(() => {
  //   return () => setPage(1);
  // }, [setPage]);

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

  const numberCol: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        field: 'select',
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
        renderCell: (params) => (
          <Checkbox
            defaultValue={undefined}
            onChange={(e) => handleIdChange(e, params.row.id)}
            checked={printIds.includes(params.row.id)}
          />
        ),
      },
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
    [expensesData?.results?.length, handleIdChange, includedRole, page, printIds, t, wholeIdsPrint],
  );

  const actionCol: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        hide: false,
        field: 'action',
        headerName: t('ExComments'),
        width: 250,
        renderCell: (params: ReturnGenerateTools<ExpenseType>) => (
          <Stack spacing={0}>
            <Tooltip title={params.row.description || ''}>
              <Typography noWrap fontSize={14}>
                {params.row?.description?.trim() || '-'}
              </Typography>
            </Tooltip>
            <TrackExpensesActions printIds={printIds} data={params.row} />
          </Stack>
        ),
      },
    ],
    [printIds, t],
  );

  useMemo(() => {
    //insured and registrar should not see topic_name column
    if (includedRole([INSURED_R, REGISTRAR_R])) {
      columns.find((i) => i.field === 'topic_name')!.hide = true;
    }
    // registrar should not see expense_type column
    if (includedRole([REGISTRAR_R])) {
      columns.find((i) => i.field === 'expense_type')!.hide = true;
    }
    //only admin , editor and adjuster can see deductions column
    if (includedRole([ADMIN_R, EDITOR_R, ADJUSTER_R])) {
      columns.find((i) => i.field === 'deductions')!.hide = false;
    }
    //only superadjuster, adjuster, coubter and reporter can see date column
    if (includedRole([ADJUSTER_R, SUPERADJUSTER_R, REPORTER_R, COUNTER_R])) {
      columns.find((i) => i.field === 'date')!.hide = false;
    }
    //only admin can see transfer column
    if (includedRole([ADMIN_R])) {
      columns.find((i) => i.field === 'transfer')!.hide = false;
    }
    //only admin , editor, insured and counter can see expense_status column
    if (includedRole([INSURED_R, ADMIN_R, EDITOR_R, COUNTER_R])) {
      columns.find((i) => i.field === 'expense_status')!.hide = false;
    }
    //only adjuster and admin can see expense_date column
    if (includedRole([ADJUSTER_R, ADMIN_R])) {
      columns.find((i) => i.field === 'expense_date')!.hide = false;
    }
    //only adjuster can see created_by column
    if (includedRole([ADJUSTER_R])) {
      columns.find((i) => i.field === 'created_by')!.hide = false;
    }
  }, [includedRole]);

  return (
    <Stack spacing={2} sx={{ pt: 2 }}>
      <Stack spacing={2} p={1}>
        {includedRole([ADMIN_R, EDITOR_R, INSURED_R, COUNTER_R]) ? (
          <>
            {smLaptop ? (
              <Fab variant='extended' sx={fabStyle.fab} color='primary' aria-label='add'>
                <Stack
                  direction='row'
                  alignItems='center'
                  component={Link}
                  to={ROUTES_NAME.expense.add}
                  sx={fabStyle.box}
                >
                  {t('AddExpense')}
                  <MdAdd size={20} color='#FFF' />
                </Stack>
              </Fab>
            ) : (
              <Button
                component={Link}
                to={ROUTES_NAME.expense.add}
                variant='outlined'
                color='success'
                sx={{ width: 'max-content' }}
              >
                {t('AddExpense')}
              </Button>
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
          columns={numberCol.concat(columns).concat(actionCol)}
          dataGridProps={{
            // ...(expensesData?.results.length === PageSize && { height: 800 }),
            stickyHeader: true,
            checkboxSelection: false,
            onRowDoubleClick: (params) => {
              if (includedRole([ADJUSTER_R, SUPERADJUSTER_R, TRUSTEDDOCTOR_R, RECEIPTIONICT_R]))
                navigate(ROUTES_NAME.expense.detail, {
                  state: { expenseId: params.row.id },
                  // replace: true,
                });
              // else navigate(`/expense/${params.row.id}`);
            },
          }}
          //   onRowDoubleClick: (params) => {
          //     navigate(`/expense/${params.row.id}`);
          //   },
          // }}
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
