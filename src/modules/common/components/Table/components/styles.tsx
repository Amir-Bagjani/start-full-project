import { styled } from '@mui/material/styles';
import { Box, TableCell, TableRow, Table } from '@mui/material';

export const TableWrapper = styled(Table)(({ theme }) =>
  theme.unstable_sx({
    position: 'relative',
  }),
);
export const BodyTableCell = styled(TableCell)(() => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  paddingInlineStart: '0.5rem',
  paddingInlineEnd: '0.1rem',
}));
export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontWeight: 'bold',
  border: 0,
  paddingInlineStart: '0.5rem',
  paddingInlineEnd: '0.1rem',
  '&:not(:last-child)': {
    borderInlineEnd: '1px solid',
    borderColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[500],
  },
}));
export const BodyTableRow = styled(TableRow)(({ theme }) => ({
  borderBlockEnd: `1px solid`,
  borderColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[500],
}));
export const TableFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderTop: 0,
}));

export const CustomTableContainer = styled(Box)<{ height: number | undefined }>(
  ({ height, theme }) => ({
    width: '100%',
    overflow: 'auto',
    ...(!!height && { height: `${height}px` }),
    scrollbarColor: `${
      theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.grey[700]
    } ${theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[500]}`,
    scrollbarWidth: 'thin',
    boxShadow: theme.customShadows.s8,
    '&::-webkit-scrollbar': {
      width: '0.5rem',
      height: '0.5rem',
    },
    '&::-webkit-scrollbar-track': {
      background:
        theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[500],
      borderRadius: '24px',
    },
    '&::-webkit-scrollbar-thumb': {
      background:
        theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.grey[700],
      borderRadius: '5px',
    },
  }),
);
