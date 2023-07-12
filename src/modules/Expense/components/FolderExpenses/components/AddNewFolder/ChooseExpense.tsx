import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Collapse, Paper, Stack } from '@mui/material';
import { ReactNode, memo, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useFormContext, useWatch } from 'react-hook-form';

//components
import { FiSearch } from 'react-icons/fi';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { Button, DatePicker, NewDataGridTable, Select, TextBox } from 'modules/common/components';

// utils
import {
  useExpenseTypeAPI,
  useExpenseStatusAPI,
  useCostCenterTypeAPI,
  useModal as useCollapse,
  useExpenseArchiveTableAPI,
} from 'modules/common/hooks';
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { ExpenseArchivedTypeResponse } from 'services/models';
import { columnsDataArchiveReport as columns } from 'modules/common/utils';

//types
type ChooseExpenseProps = {
  submitForm: ReactNode;
};
type SearchValueType = {
  expense: string | number;
  cost_center_type: string | number;
  name: string;
  fdate: string | null;
  tdate: string | null;
  expense_status: string | number;
  expense_type: string | number;
};
type FilterSearchProps = {
  pageSet: (e: number) => void;
  filterSearchSet: (e: SearchValueType) => void;
  submitForm: ReactNode;
};
type ShowResultProps = {
  pageSet: (e: number) => void;
  page: number;
  data?: ExpenseArchivedTypeResponse;
  loading: boolean;
};

//constants
const onError = () => {
  toast.error(Constants.PublicFetchError);
};
const options = { staleTime: 1 * 1000 * 60 * 60 };
const PageSize = 30;
const defaultValue: SearchValueType = {
  expense: '',
  cost_center_type: '',
  fdate: null,
  tdate: null,
  expense_status: '',
  expense_type: '',
  name: '',
};

export const ChooseExpense = memo(({ submitForm }: ChooseExpenseProps) => {
  const [page, setPage] = useState(1);
  const [filterSearch, setّFilterSearch] = useState<SearchValueType>(defaultValue);

  const { data, isInitialLoading } = useExpenseArchiveTableAPI(
    {
      page,
      filter: filterSearch,
    },
    {
      keepPreviousData: true,
      onError,
    },
  );

  const pageSet = useCallback((e: number) => {
    setPage(e);
  }, []);
  const filterSearchSet = useCallback((e: SearchValueType) => {
    setّFilterSearch(e);
  }, []);

  return (
    <>
      <FilterSearch submitForm={submitForm} pageSet={pageSet} filterSearchSet={filterSearchSet} />
      <ShowResult pageSet={pageSet} page={page} data={data} loading={isInitialLoading} />
    </>
  );
});

const FilterSearch = ({ pageSet, filterSearchSet, submitForm }: FilterSearchProps) => {
  const { t } = useTranslation();

  const { isOpen: open, onToggle: toggleCollapse } = useCollapse();

  const { isInitialLoading: isLoadingExpenseType, data: expenseType } = useExpenseTypeAPI(
    {},
    options,
  );
  const { isInitialLoading: isLoadingCostCenterType, data: costCenterType } = useCostCenterTypeAPI(
    {},
    options,
  );
  const { isInitialLoading: isLoadingExpenseStatus, data: expenseStatus } = useExpenseStatusAPI(
    {},
    options,
  );

  const { handleSubmit, control } = useForm<SearchValueType>({
    defaultValues: defaultValue,
  });

  const fdate = useWatch<SearchValueType>({
    control,
    name: 'fdate',
  }) as SearchValueType['fdate'];

  const onSubmit: SubmitHandler<SearchValueType> = (filter) => {
    pageSet(1);
    filterSearchSet({
      ...filter,
      ...(filter.fdate && { fdate: DateFormat.getDate(filter.fdate) }),
      ...(filter.tdate && { tdate: DateFormat.getDate(filter.tdate) }),
    });
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          startIcon={open ? <BsArrowsCollapse /> : <BsArrowsExpand />}
          sx={{ py: 1, mb: 1 }}
          variant='outlined'
          onClick={toggleCollapse}
        >
          {open ? t('ExClearFilters') : t('ExShowFilters')}
        </Button>
        {submitForm}
      </Stack>
      <Collapse in={open}>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            return handleSubmit(onSubmit)(e);
          }}
        >
          <Stack
            spacing={{ zero: 1.3, tablet: 4 }}
            sx={{ py: 2, px: 1, borderRadius: 1, boxShadow: 'none' }}
            component={Paper}
          >
            <Stack direction='row' spacing={{ zero: 1.3, tablet: 4 }}>
              <Select.Form<{ label: string; value: any }>
                name='expense_type'
                control={control}
                label={t('ExpenseExpType')}
                isLoading={isLoadingExpenseType}
                defaultSelect={{ label: '', value: '' }}
                options={expenseType?.map((i) => ({ label: i.name, value: i.id })) || []}
              />
              <Select.Form<{ label: string; value: any }>
                name='cost_center_type'
                control={control}
                label={t('ExpenseExpCostCenterType')}
                isLoading={isLoadingCostCenterType}
                defaultSelect={{ label: '', value: '' }}
                options={costCenterType?.map((i) => ({ label: i.name, value: i.code })) || []}
              />
            </Stack>

            <Stack direction='row' spacing={{ zero: 1.3, tablet: 4 }}>
              <Select.Form<{ label: string; value: any }>
                name='expense_status'
                control={control}
                label={t('ExpenseExpStatus')}
                isLoading={isLoadingExpenseStatus}
                defaultSelect={{ label: '', value: '' }}
                options={expenseStatus?.map((i) => ({ label: i.name, value: i.code })) || []}
              />
              <TextBox.Form
                name='name'
                control={control}
                fullWidth
                variant='outlined'
                label={t('ExNameLabel')}
              />
            </Stack>

            <Stack direction='row' spacing={{ zero: 1.3, tablet: 4 }}>
              <DatePicker.Form
                name='fdate'
                control={control}
                disableFuture
                label={t('ExFdateLabel') as string}
              />
              <DatePicker.Form
                name='tdate'
                control={control}
                disableFuture
                label={t('ExTdateLabel') as string}
                minDate={fdate}
              />
            </Stack>

            <Button
              type='submit'
              variant='contained'
              sx={{ alignSelf: 'flex-end', px: 3 }}
              startIcon={<FiSearch />}
            >
              {t('ExSearch')}
            </Button>
          </Stack>
        </form>
      </Collapse>
    </>
  );
};

const ShowResult = ({ loading, data, page, pageSet }: ShowResultProps) => {
  const { setValue } = useFormContext();

  const [expenses, expensesShowList] = useWatch({
    name: ['expenses', 'expensesShowList'],
  });

  const expensesShowListRef = useRef(expensesShowList);

  useEffect(() => {
    //for increasing performance, update expensesShowList after unmounting this component
    return () => {
      setValue('expensesShowList', expensesShowListRef.current);
    };
  }, [setValue]);

  return (
    <>
      <NewDataGridTable
        loading={loading}
        rows={data?.results ?? []}
        columns={columns}
        dataGridProps={{
          keepNonExistentRowsSelected: true,
          selectionModel: expenses,
          onSelectionModelChange: (ids) => {
            if (!!!ids.length) return;
            //for showing expenses in ShowSelectedExpense component,
            //we need have extract them from data
            const selectedIDs = new Set(ids);
            const selectedRowData = data?.results.filter((row) => selectedIDs.has(row.id));
            //concat with all pages data
            expensesShowListRef.current = expensesShowListRef.current.concat(selectedRowData);

            //make data unique
            const uniqueData = [
              ...new Map(expensesShowListRef.current.map((v: any) => [v.id, v])).values(),
            ];

            //remove onselected item
            const selectedData = uniqueData.filter((item: any) => ids.includes(item.id));

            setValue('expenses', ids, { shouldDirty: true });
            //for increasing performance, update expensesShowList after unmounting this component
            expensesShowListRef.current = selectedData;
          },
        }}
        paginatable
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
