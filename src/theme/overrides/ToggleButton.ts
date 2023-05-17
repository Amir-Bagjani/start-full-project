import { alpha, Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

type PickedColors = Pick<
  Theme['palette'],
  'info' | 'success' | 'warning' | 'error' | 'primary' | 'secondary'
>;
type Color = keyof PickedColors;

const style = (color: Color, theme: Theme) => {
  if (!color) return;
  return {
    props: { color },
    style: {
      '&:hover': {
        borderColor: alpha(theme.palette[color].main, 0.48),
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
      },
      '&.Mui-selected': {
        borderColor: alpha(theme.palette[color].main, 0.48),
      },
    },
  };
};

export default function ToggleButton(theme: Theme) {
  return {
    MuiToggleButton: {
      variants: [
        {
          props: { color: 'standard' },
          style: {
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
            },
          },
        },
        style('primary', theme),
        style('secondary', theme),
        style('info', theme),
        style('success', theme),
        style('warning', theme),
        style('error', theme),
      ],
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${theme.palette.grey[500_12]}`,
          '& .MuiToggleButton-root': {
            margin: 4,
            borderColor: 'transparent !important',
            borderRadius: `${theme.shape.borderRadius}px !important`,
          },
        },
      },
    },
  };
}
