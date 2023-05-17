import { Palette, alpha } from '@mui/material';
import { CustomPalette } from 'theme/models';
// import { createGradient } from "./utils";

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
  green: {
    50: '#e4f8e9',
    100: '#bdedca',
    200: '#90e1a7',
    300: '#57d683',
    400: '#00cc66',
    500: '#00c248',
    600: '#00b23e',
    700: '#009f31',
    800: '#008e24',
    900: '#006e0e',
  },
  forestGreen: {
    50: '#99efbc',
    100: '#7aeaa8',
    200: '#5be594',
    300: '#3ce17f',
    400: '#21d86c',
    500: '#1cb95c',
    600: '#179a4d',
    700: '#137b3d',
    800: '#0e5c2e',
    900: '#093d1e',
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
    50: '#8ed2fa',
    100: '#6bc5f9',
    200: '#49b8f8',
    300: '#26aaf6',
    400: '#099cf0',
    500: '#0785ce',
    600: '#066fab',
    700: '#055989',
    800: '#034267',
    900: '#022c44',
  },
  blue: {
    50: '#e0f7fc',
    100: '#b3ebf7',
    200: '#81dff2',
    300: '#4dd1eb',
    400: '#24c7e5',
    500: '#00bedf',
    600: '#00aecb',
    700: '#0099b1',
    800: '#008598',
    900: '#00626c',
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
  lighter: COLORS.green[100],
  light: COLORS.green[300],
  main: COLORS.green[500],
  dark: COLORS.green[700],
  darker: COLORS.green[900],
};

export const infoPalette = {
  lighter: COLORS.blue[100],
  light: COLORS.blue[300],
  main: COLORS.blue[500],
  dark: COLORS.blue[700],
  darker: COLORS.blue[900],
};

export const secondaryPalette = {
  lighter: COLORS.forestGreen[200],
  light: COLORS.forestGreen[300],
  main: COLORS.forestGreen[500],
  dark: COLORS.forestGreen[700],
  darker: COLORS.forestGreen[800],
};

export const primaryPalette = {
  lighter: COLORS.azureBlue[200],
  light: COLORS.azureBlue[300],
  main: COLORS.azureBlue[500],
  dark: COLORS.azureBlue[700],
  darker: COLORS.azureBlue[800],
};

// const gradient = {
//     primary: createGradient(primaryPalette.light, primaryPalette.main),
//     info: createGradient(infoPalette.light, infoPalette.main),
//     success: createGradient(successPalette.light, successPalette.main),
//     warning: createGradient(warningPalette.light, warningPalette.main),
//     error: createGradient(errorPalette.light, errorPalette.main),
// };

// const chartColor = {
//     violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
//     blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
//     green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
//     yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
//     red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
// };

// Theme["palette"]["grey"]
// Color

export const commonPalette = {
  common: { black: COLORS.black, white: COLORS.white },
  primary: { ...primaryPalette, contrastText: '#fff' },
  secondary: { ...secondaryPalette, contrastText: '#fff' },
  info: { ...infoPalette, contrastText: '#fff' },
  success: { ...successPalette, contrastText: COLORS.grey[800] },
  warning: { ...warningPalette, contrastText: COLORS.grey[800] },
  error: { ...errorPalette, contrastText: '#fff' },
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

export const lightPalette = {
  ...commonPalette,
  divider: COLORS.grey[500_24],
  text: { primary: COLORS.grey[800], secondary: COLORS.grey[600], disabled: COLORS.grey[500] },
  background: { paper: COLORS.white, default: COLORS.white, neutral: COLORS.grey[200] },
  action: { active: COLORS.grey[600], ...commonPalette.common },
};

export const darkPalette = {
  ...commonPalette,
  divider: COLORS.grey[500_16],
  text: { primary: COLORS.white, secondary: COLORS.grey[500], disabled: COLORS.grey[600] },
  background: { paper: COLORS.grey[800], default: COLORS.grey[900], neutral: COLORS.grey[500_16] },
  action: { active: COLORS.grey[500], ...commonPalette.common },
};
