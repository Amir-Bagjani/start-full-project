import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------
type PickedColors = Pick<
  Theme['palette'],
  'info' | 'success' | 'warning' | 'error' | 'primary' | 'secondary'
>;
type Color = keyof PickedColors;

const styleContained = (color: Color, theme: Theme) => ({
  props: { variant: 'contained', color },
  style: { boxShadow: theme.customShadows[color] },
});

export default function ButtonGroup(theme: Theme) {
  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: 'contained', color: 'inherit' },
          style: { boxShadow: theme.customShadows.s8 },
        },
        styleContained('primary', theme),
        styleContained('secondary', theme),
        styleContained('info', theme),
        styleContained('success', theme),
        styleContained('warning', theme),
        styleContained('error', theme),

        {
          props: { disabled: true },
          style: {
            boxShadow: 'none',
            '& .MuiButtonGroup-grouped.Mui-disabled': {
              color: theme.palette.action.disabled,
              borderColor: `${theme.palette.action.disabledBackground} !important`,
              '&.MuiButton-contained': {
                backgroundColor: theme.palette.action.disabledBackground,
              },
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  };
}
