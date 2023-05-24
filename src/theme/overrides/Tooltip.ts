import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function Tooltip(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 600],
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 700],
        },
      },
    },
  };
}
