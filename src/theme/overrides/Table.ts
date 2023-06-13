import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.mode === 'light' ? '#e5e8eb' : '#2c3a47',
          '&:first-of-type': {
            // paddingLeft: theme.spacing(3),
            // borderTopLeftRadius: theme.shape.borderRadius,
            // borderBottomLeftRadius: theme.shape.borderRadius,
            // boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`,
          },
          '&:last-of-type': {
            // paddingRight: theme.spacing(3),
            // borderTopRightRadius: theme.shape.borderRadius,
            // borderBottomRightRadius: theme.shape.borderRadius,
            // boxShadow: `inset -8px 0 0 ${theme.palette.background.paper}`,
          },
        },
        stickyHeader: {
          // backgroundColor: theme.palette.background.paper,
          // backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        body: {
          ...theme.typography.overline,
          color: theme.palette.text.secondary,
          '&:first-of-type': {
            // paddingLeft: theme.spacing(3),
          },
          '&:last-of-type': {
            // paddingRight: theme.spacing(3),
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: -4,
        },
      },
    },
  };
}
