import {
  Paper,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
} from '@mui/material';
import { Children, useCallback, useMemo, useRef, useState } from 'react';

//components
import {
  TableFooter,
  BodyTableRow,
  TableWrapper,
  BodyTableCell,
  LoadingOverlay,
  HeaderTableCell,
  NoResultsOverlay,
  CustomTableContainer,
} from './components';
import { checkId, getCellStyle } from './utils';

//types
import type { MouseEvent, ReactNode, ChangeEvent } from 'react';

//type definition
export type CustomTableColumn<T = {}> = {
  field: string;
  headerName: ReactNode;
  width?: number;
  hide?: boolean;
  renderCell?: (params: ReturnGenerateTools<T>) => ReactNode;
  valueGetter?: (params: ReturnGenerateTools<T>) => ReactNode;
};

export type CustomTableProps<T> = {
  columns: CustomTableColumn<T>[];
  rows: T[];
  getRowId?: (row: T) => string | number;
  height?: number;
  loading?: boolean;
  checkboxSelection?: boolean;
  onRowDoubleClick?: (row: ReturnGenerateTools<T>, event: MouseEvent) => void;
  onSelectionModelChange?: (selection: Array<string | number>) => void;
  selectionModel?: Array<string | number>;
  keepNonExistentRowsSelected?: boolean;
  hideFooter?: boolean;
  pagination?: boolean;
  pageSize?: number;
  stickyHeader?: boolean;
};

export type ReturnGenerateTools<T> = {
  row: T;
  api: {
    getRowIndex: (id: string | number) => number;
    getId: () => string | number;
  };
};

export type GenerateToolsFn<T> = (row: T) => ReturnGenerateTools<T>;

/**
 * An object describing a table column.
 *
 * @typedef {Object} TableColumn
 * @property {string} field - The unique identifier for the column.
 * @property {string} headerName - The text label for the column.
 * @property {number} [width] - The width of the column, in pixels.
 * @property {boolean} [hide] - The hide can stop showing the column.
 * @property {function} [renderCell] - A function that returns the cell value for the column.
 * @property {function} [onRowDoubleClick] - A function that returns the row value and event.
 * @property {function} [valueGetter] - A function that returns the cell value for the column.
 */

/**
 * A table component that displays data in rows and columns.
 * Supports optional selection of rows and customizable column widths.
 *
 *
 * @param {Object} props - The component props.
 * @param {TableColumn[]} props.columns - An array of column configuration objects.}
 * @param {Array<Object>} props.data - An array of data objects to display in the table.
 * @param {function} [props.getRowId] - a function to declare new id for data. (row: T) => string.
 * @param {number} [props.height] - The height of the column, in pixels.
 * @param {boolean} [checkboxSelection] - If true, displays a checkbox in the first column of each row for selecting the row (optional).
 * @param {boolean} [hideFooter] - 	If true, the footer component is hidden default true.
 * @param {boolean} [pagination] - 	If true, the pagination component is visible default false.
 * @param {Function} [onSelectionModelChange] - A function that receives an array of selected row ids as argument and is called when the selection changes (optional).
 * @param {string[]} [selectionModel] - An array of selected row ids (optional).
 * @param {boolean} [keepNonExistentRowsSelected] - If true, keeps the selected rows in the selection model even if they are removed from the data (optional).
 * @param {boolean} [stickyHeader] - If true, header will fix at top of table - defult false.
 * @param {number} [pageSize] - the number of rows in each page.
 *
 *
 * @returns {JSX.Element} The rendered table component.
 *
 */

export const Table = <T extends { id: string | number }>(
  props: CustomTableProps<T>,
): JSX.Element => {
  const {
    rows,
    height,
    loading,
    columns,
    getRowId,
    onRowDoubleClick,
    selectionModel = [],
    checkboxSelection = false,
    onSelectionModelChange = () => {},
    keepNonExistentRowsSelected = false,
    hideFooter = true,
    pagination = false,
    pageSize = 100,
    stickyHeader = false,
  } = props;

  const [page, setPage] = useState(0);

  const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const allSelected = useRef<Array<string | number>>([]);
  const [newSelectionModel, setNewSelectionModel] = useState(() => {
    if (keepNonExistentRowsSelected) return [...selectionModel, ...allSelected.current];
    return [...selectionModel];
  });

  if (!getRowId) checkId<T>(rows);

  const getId = useMemo(() => getRowId || ((row: T) => row.id), [getRowId]);

  const handleSelectionModelChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string | number) => {
      let arr = [...newSelectionModel];
      if (onSelectionModelChange) {
        if (e.target.checked) {
          arr.push(id);
        } else {
          arr = arr.filter((s) => s !== id);
        }
        if (keepNonExistentRowsSelected) allSelected.current = arr;
        setNewSelectionModel(arr);
        onSelectionModelChange(arr);
      }
    },
    [keepNonExistentRowsSelected, newSelectionModel, onSelectionModelChange],
  );

  // const handleAllSelectionModelChange = useCallback((e) => {
  //   let arr = [...newSelectionModel];
  //   if (onSelectionModelChange) {
  //     if (e.target.checked) {
  //       // arr.push(id)
  //     } else {
  //       // arr = arr.filter((s) => s !== id);
  //     }
  //     if (keepNonExistentRowsSelected) allSelected.current = arr;
  //     setNewSelectionModel(arr)
  //     onSelectionModelChange(arr);
  //   }
  // }, [keepNonExistentRowsSelected, newSelectionModel, onSelectionModelChange]);

  const generateTools: GenerateToolsFn<T> = useCallback(
    (row) => {
      return {
        row,
        api: {
          getRowIndex: (id: string | number) =>
            rows.findIndex((obj) => obj.id.toString() === id.toString()),
          getId: () => getId(row),
        },
      };
    },
    [getId, rows],
  );

  return (
    <>
      <CustomTableContainer component={Paper} height={height}>
        <TableWrapper size='small' aria-label='data table'>
          <TableHead sx={stickyHeader ? { position: 'sticky', zIndex: 10, top: 0 } : {}}>
            <TableRow>
              {checkboxSelection && (
                <TableCell sx={{ px: 0.2, width: 18 }}>
                  <Checkbox
                    // checked={ }
                    // onChange={handleAllSelectionModelChange}
                    disabled
                  />
                </TableCell>
              )}
              {Children.toArray(
                columns.map((column) => {
                  if (column.hide) {
                    return null;
                  }
                  return (
                    <HeaderTableCell sx={{ ...getCellStyle(column) }}>
                      {column.headerName}
                    </HeaderTableCell>
                  );
                }),
              )}
              <HeaderTableCell sx={{ width: 1, border: 0, p: 0 }} />
            </TableRow>
          </TableHead>

          {!!!loading && !!rows.length && (
            <TableBody sx={{ border: 0, bgcolor: 'background.neutral' }}>
              {Children.toArray(
                rows.slice(page * pageSize, page * pageSize + pageSize).map((row) => (
                  <BodyTableRow
                    hover
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      onRowDoubleClick?.(generateTools(row), e);
                    }}
                  >
                    {checkboxSelection && (
                      <BodyTableCell sx={{ border: 0, px: 0.2 }}>
                        <Checkbox
                          checked={newSelectionModel?.includes(getId(row))}
                          onChange={(e) => handleSelectionModelChange(e, getId(row))}
                          inputProps={{ 'aria-labelledby': getId(row) as string }}
                        />
                      </BodyTableCell>
                    )}
                    {Children.toArray(
                      columns.map((column) => {
                        const { renderCell, valueGetter, hide, field = '' } = column;

                        if (hide) {
                          return null;
                        }

                        const cellValue = renderCell
                          ? renderCell(generateTools(row))
                          : valueGetter
                          ? valueGetter(generateTools(row))
                          : (row as any)[field] ?? '-';
                        return (
                          <BodyTableCell sx={{ ...getCellStyle(column), border: 0 }}>
                            {cellValue}
                          </BodyTableCell>
                        );
                      }),
                    )}
                    <BodyTableCell sx={{ width: 1, border: 0, p: 0 }} />
                  </BodyTableRow>
                )),
              )}
            </TableBody>
          )}
        </TableWrapper>
        {!!loading && <LoadingOverlay />}
        {!!!loading && !!!rows.length && <NoResultsOverlay />}
        {!hideFooter && (
          <TableFooter>
            {pagination && (
              <TablePagination
                rowsPerPageOptions={[-1]}
                component='div'
                count={rows?.length ?? 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={() => {}}
              />
            )}
          </TableFooter>
        )}
      </CustomTableContainer>
    </>
  );
};
