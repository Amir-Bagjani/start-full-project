import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Box, Button, Paper, Stack } from '@mui/material';

//components
import { AiFillPrinter } from 'react-icons/ai';
import { Table, Pagination } from 'modules/common/components';

//types
import { CustomTableColumn, CustomTableProps, PaginationProps } from 'modules/common/components';

//type definition
export type TypeDataGridTable<T> = {
  printable?: boolean;
  paginatable?: boolean;
  columns: CustomTableColumn<T>[];
  paginationProps?: PaginationProps;
  rows: CustomTableProps<T>['rows'];
  loading: CustomTableProps<T>['loading'];
  dataGridProps: Omit<CustomTableProps<T>, 'loading' | 'rows' | 'columns'>;
};

export const NewDataGridTable = <T extends { id: string | number }>(
  props: TypeDataGridTable<T>,
) => {
  const {
    rows,
    loading,
    columns,
    dataGridProps,
    paginationProps,
    printable = false,
    paginatable = false,
  } = props;

  const printTable = useRef(null);

  return (
    <Box component={Paper} sx={{ boxShadow: 'none' }}>
      {!!printable && (
        <Stack alignItems='flex-end'>
          <ReactToPrint
            trigger={() => <Button endIcon={<AiFillPrinter />}>چاپ جدول </Button>}
            content={() => printTable.current}
          />
        </Stack>
      )}

      <div ref={printTable} className='print'>
        <Table
          loading={loading}
          rows={rows}
          columns={columns}
          checkboxSelection
          {...dataGridProps}
        />
      </div>
      {!!paginatable && !!paginationProps && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          sx={{
            p: 0.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.background.paper
                : theme.palette.grey['800'],
            borderRadius: '0 0 0.5rem 0.5rem',
          }}
        >
          <Pagination
            currentPage={paginationProps?.currentPage}
            lastPage={paginationProps?.lastPage}
            maxLength={paginationProps?.maxLength ?? 7}
            onChange={paginationProps?.onChange}
          />
        </Stack>
      )}
    </Box>
  );
};
