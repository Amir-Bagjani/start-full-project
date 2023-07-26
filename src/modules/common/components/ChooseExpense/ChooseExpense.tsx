import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { ReactNode, memo, useCallback, useState } from 'react';

//components
import { FilterSearch, ShowResult } from './components';
import { NewDataGridTable } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useExpensesForTransferAPI } from 'modules/common/hooks';
import { columnDataExpenseForTransfer as columns } from './utils';

//types
type ChooseExpenseProps = {
  id: number;
  submitForm: ReactNode;
};
export type DefaultSearchExpenseTransferListValue = {
  name: string;
};
// import {  ShowResult } from "./components";

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const defaultValue: DefaultSearchExpenseTransferListValue = {
  name: '',
};

export const ChooseExpense = memo(({ submitForm, id }: ChooseExpenseProps) => {
  const [page, setPage] = useState(1);
  const [filterSearch, setّFilterSearch] = useState(defaultValue);

  const { data, isInitialLoading, isFetching } = useExpensesForTransferAPI(
    {
      page,
      filter: filterSearch,
      mode: 'transfer',
      transfer: id,
    },
    {
      keepPreviousData: true,
      onError,
    },
  );

  const pageSet = useCallback((e: number) => {
    setPage(e);
  }, []);
  const filterSearchSet = useCallback((e: DefaultSearchExpenseTransferListValue) => {
    setّFilterSearch(e);
  }, []);

  return (
    <Stack spacing={2}>
      <FilterSearch pageSet={pageSet} submitForm={submitForm} filterSearchSet={filterSearchSet} />
      {isFetching ? (
        <NewDataGridTable loading={true} rows={[]} columns={columns} />
      ) : (
        <ShowResult pageSet={pageSet} page={page} data={data} loading={isInitialLoading} />
      )}
    </Stack>
  );
});
