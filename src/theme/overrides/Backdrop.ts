import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop(theme: Theme) {
  const color = theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[700];
  const varLow = alpha(color, 0.48);
  const varHigh = alpha(color, 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: [
            `rgb(22,28,36)`,
            `-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          ],
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
  };
}
