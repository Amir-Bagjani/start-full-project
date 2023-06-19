import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function CssBaseline(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          fontFamily: 'IRANSans, Courier, monospace',
          scrollbarColor: `${
            theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.grey[700]
          } ${theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[500]}`,
          scrollbarWidth: 'thin',
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
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.default,
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        a: {
          textDecoration: 'none',
          color: theme.palette.text.primary,
        },
      },
    },
  };
}
