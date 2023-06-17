import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function Container(theme: Theme) {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          maxWidth: '1260px',
          // padding: 0,
          borderRadius: theme.spacing(1),
        },
      },
    },
  };
}
