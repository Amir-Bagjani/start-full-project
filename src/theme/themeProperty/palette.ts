import { Theme, alpha } from '@mui/material/styles';

import { createGradient } from 'theme/utils';
import { CustomPalette, Gradient } from 'theme/models';

export const COLORS = {
  black: '#000',
  white: '#FFFFFF',
  grey: {
    0: '#FFFFFF',
    50: '#fcfcfc',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    5008: alpha('#919EAB', 0.08),
    50012: alpha('#919EAB', 0.12),
    50016: alpha('#919EAB', 0.16),
    50024: alpha('#919EAB', 0.24),
    50032: alpha('#919EAB', 0.32),
    50048: alpha('#919EAB', 0.48),
    50056: alpha('#919EAB', 0.56),
    50080: alpha('#919EAB', 0.8),
  },
  red: {
    50: '#ffe9ed',
    100: '#ffc9ce',
    200: '#f49292',
    300: '#eb6667',
    400: '#f53d40',
    500: '#f92020',
    600: '#eb0b21',
    700: '#d9001c',
    800: '#cc0014',
    900: '#bd0005',
  },
  orange: {
    50: '#fff3e1',
    100: '#ffe1b3',
    200: '#ffcd83',
    300: '#ffb851',
    400: '#ffa82d',
    500: '#ff9a11',
    600: '#fc8e10',
    700: '#f67e0e',
    800: '#f06e0d',
    900: '#e6540b',
  },
  lime: {
    50: '#feffe6',
    100: '#fbfdc0',
    200: '#f7fa93',
    300: '#f2f763',
    400: '#edf335',
    500: '#fbff00',
    600: '#eaec67',
    700: '#dee200',
    800: '#bfb900',
    900: '#917c00',
  },
  purple: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  forestGreen: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  fiord: {
    50: '#e6eef9',
    100: '#c7d5e3',
    200: '#9da8b2',
    300: '#879db2',
    400: '#6f889f',
    500: '#57748d',
    600: '#4a657c',
    700: '#3b5266',
    800: '#2d3f50',
    900: '#1b2b39',
  },
  azureBlue: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  blue: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
};

export const errorPalette = {
  lighter: COLORS.red[100],
  light: COLORS.red[300],
  main: COLORS.red[500],
  dark: COLORS.red[700],
  darker: COLORS.red[900],
};

export const warningPalette = {
  lighter: COLORS.orange[100],
  light: COLORS.orange[300],
  main: COLORS.orange[500],
  dark: COLORS.orange[700],
  darker: COLORS.orange[900],
};

export const successPalette = {
  lighter: COLORS.forestGreen[100],
  light: COLORS.forestGreen[300],
  main: COLORS.forestGreen[500],
  dark: COLORS.forestGreen[700],
  darker: COLORS.forestGreen[900],
};

export const defaultPalette = {
  lighter: COLORS.blue[100],
  light: COLORS.blue[300],
  main: COLORS.blue[700],
  dark: COLORS.blue[800],
  darker: COLORS.blue[900],
};
export const primaryPalette = {
  lighter: COLORS.blue[100],
  light: COLORS.blue[300],
  main: COLORS.blue[700],
  dark: COLORS.blue[800],
  darker: COLORS.blue[900],
};
export const primaryPaletteDark = {
  lighter: COLORS.blue[100],
  light: COLORS.blue[300],
  main: COLORS.blue[500],
  dark: COLORS.blue[800],
  darker: COLORS.blue[900],
};

export const secondaryPalette = {
  lighter: COLORS.purple[200],
  light: COLORS.purple[300],
  main: COLORS.purple[500],
  dark: COLORS.purple[700],
  darker: COLORS.purple[800],
};

export const infoPalette = {
  lighter: COLORS.azureBlue[200],
  light: COLORS.azureBlue[300],
  main: COLORS.azureBlue[500],
  dark: COLORS.azureBlue[700],
  darker: COLORS.azureBlue[800],
};

export const lightBackground = {
  paper: COLORS.white,
  default: COLORS.grey[200],
  neutral: COLORS.grey[50],
};
export const paleBlackBackground = {
  paper: '#242526',
  default: '#18191a',
  neutral: '#3a3b3c',
};
export const blackBackground = {
  paper: '#192734',
  default: '#15202b',
  neutral: '#22303c',
};
// export const deepBackground = {
//   paper: '#292b2f',
//   default: '#202225',
//   neutral: '#2f3136',
// };

// const chartColor = {
//     violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
//     blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
//     green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
//     yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
//     red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
// };

export const commonPalette = {
  common: { black: COLORS.black, white: COLORS.white },
  primary: { ...primaryPalette, contrastText: COLORS.white },
  default: { ...defaultPalette, contrastText: COLORS.white },
  secondary: { ...secondaryPalette, contrastText: COLORS.white },
  info: { ...infoPalette, contrastText: COLORS.white },
  success: { ...successPalette, contrastText: COLORS.white },
  warning: { ...warningPalette, contrastText: COLORS.white },
  error: { ...errorPalette, contrastText: COLORS.white },
  background: lightBackground,
  grey: COLORS.grey,
  // gradient,
  // chartColor,
  action: {
    hover: COLORS.grey[500_8],
    selected: COLORS.grey[500_16],
    disabled: COLORS.grey[500_80],
    disabledBackground: COLORS.grey[500_24],
    focus: COLORS.grey[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
} as CustomPalette;

export const lightPalette: any = {
  ...commonPalette,
  mode: 'light',
  divider: COLORS.grey[500_24],
  text: { primary: COLORS.grey[700], secondary: COLORS.grey[600], disabled: COLORS.grey[500] },
  action: { active: COLORS.grey[600], ...commonPalette.common },
};
export const darkPalette: any = {
  ...commonPalette,
  mode: 'dark',
  divider: COLORS.grey[500_16],
  text: { primary: COLORS.grey[400], secondary: COLORS.grey[600], disabled: COLORS.grey[700] },
  action: { active: COLORS.grey[500], ...commonPalette.common },
};

export const gradientGen = (theme: Theme): Gradient => ({
  primary: createGradient(primaryPalette.light, primaryPalette.dark),
  info: createGradient(infoPalette.light, infoPalette.dark),
  success: createGradient(successPalette.light, successPalette.dark),
  warning: createGradient(warningPalette.light, warningPalette.dark),
  error: createGradient(errorPalette.light, errorPalette.dark),
  themeBase: createGradient(theme.palette.primary.light, theme.palette.primary.dark),
});
