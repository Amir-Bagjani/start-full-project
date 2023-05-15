import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from 'assets/customIcons';
import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

type PickedColors = Pick<Theme['palette'], 'info' | 'success' | 'warning' | 'error'>;
type Color = keyof PickedColors;

const standardStyle = (color: Color, theme: Theme) => {
  const isLight = theme.palette.mode === 'light';
  return {
    color: theme.palette[color][isLight ? 'darker' : 'lighter'],
    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker'],
    '& .MuiAlert-icon': {
      color: theme.palette[color][isLight ? 'main' : 'light'],
    },
  };
};

const filledStyle = (color: Color, theme: Theme) => ({
  color: theme.palette[color].contrastText,
});

const outlinedStyle = (color: Color, theme: Theme) => {
  const isLight = theme.palette.mode === 'light';
  return {
    color: theme.palette[color][isLight ? 'darker' : 'lighter'],
    border: `solid 1px ${theme.palette[color][isLight ? 'light' : 'dark']}`,
    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker'],
    '& .MuiAlert-icon': {
      color: theme.palette[color][isLight ? 'main' : 'light'],
    },
  };
};

export default function Alert(theme: Theme) {
  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />,
        },
      },

      styleOverrides: {
        message: {
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(0.5),
          },
        },
        action: {
          '& button:not(:first-of-type)': {
            marginLeft: theme.spacing(1),
          },
        },

        standardInfo: standardStyle('info', theme),
        standardSuccess: standardStyle('success', theme),
        standardWarning: standardStyle('warning', theme),
        standardError: standardStyle('error', theme),

        filledInfo: filledStyle('info', theme),
        filledSuccess: filledStyle('success', theme),
        filledWarning: filledStyle('warning', theme),
        filledError: filledStyle('error', theme),

        outlinedInfo: outlinedStyle('info', theme),
        outlinedSuccess: outlinedStyle('success', theme),
        outlinedWarning: outlinedStyle('warning', theme),
        outlinedError: outlinedStyle('error', theme),
      },
    },
  };
}
