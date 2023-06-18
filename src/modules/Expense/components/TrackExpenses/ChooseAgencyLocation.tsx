import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Theme, Typography } from '@mui/material';

//components
import { FilterAgencies } from './FilterAgencies';
import { SelectAgencyLocationAction } from './SelectAgencyLocationAction';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import { columnsDataAgencies as columns } from 'modules/Expense/utils';

//types
import { useAgenciesAPI } from 'modules/common/hooks';
import { AgenciesParams, AgencyType, ExpenseType } from 'services/models';

type ChooseAgencyLocationProps = {
  data: ExpenseType;
};

export type FilterAgencyType = Omit<AgenciesParams, 'page'>;

const PageSize = 30;

const defaultValues: FilterAgencyType = {
  province: '',
  city: '',
  name: '',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  baxWrapper: {
    border: 1,
    borderRadius: 1,
    overflow: 'hidden',
    borderColor: 'grey.300',
    width: 'max-content',
  },
  header: {
    bgcolor: (t: Theme) => (t.palette.mode === 'light' ? 'grey.A200' : 'grey.700'),
    borderBottom: 1,
    borderColor: 'grey.300',
    fontSize: 14,
    p: 1,
  },
} as const;

export const ChooseAgencyLocation = ({ data }: ChooseAgencyLocationProps) => {
  const [page, setPage] = useState(1);
  const [filter, filterSet] = useState(defaultValues);

  const setFilter = useCallback((e: FilterAgencyType) => filterSet(e), []);
  const pageSet = useCallback((e: number) => setPage(e), []);

  const { data: agencies, isInitialLoading: isAgenciesLoading } = useAgenciesAPI({
    page,
    ...filter,
  });

  const selectColumn: CustomTableColumn<AgencyType>[] = useMemo(
    () => [
      {
        field: 'select',
        headerName: t('ExSelect'),
        width: 70,
        renderCell: (params) => (
          <SelectAgencyLocationAction data={params.row} expenseId={data.id} />
        ),
      },
    ],
    [data.id],
  );

  return (
    <Stack spacing={2}>
      <Box sx={styles.container}>
        <Box sx={styles.baxWrapper}>
          <Box sx={styles.header}>
            <Typography align='center' fontWeight='bold'>
              {t('ExDepartmentDelivery')}
            </Typography>
          </Box>
          <Stack p={2} direction={{ zero: 'column', tablet: 'row' }} spacing={3}>
            <Typography>
              {t('ExAgencyName')} : {data?.delivery_agency?.name ?? '-'}
            </Typography>
            <Typography>
              {t('ExAgencyAdd')}: {data?.delivery_agency?.address ?? '-'}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <FilterAgencies
        loading={isAgenciesLoading}
        setFilter={setFilter}
        defaultValue={defaultValues}
        pageSet={pageSet}
      />

      <NewDataGridTable
        loading={isAgenciesLoading}
        rows={agencies?.results ?? []}
        columns={selectColumn.concat(columns)}
        dataGridProps={{
          checkboxSelection: false,
        }}
        paginatable={(agencies?.count ?? 0) > PageSize}
        paginationProps={{
          currentPage: page,
          lastPage: Math.ceil((agencies?.count ?? 0) / PageSize),
          maxLength: 7,
          onChange: pageSet,
        }}
      />
    </Stack>
  );
};
