import { Palette, TypeBackground } from '@mui/material/styles/createPalette';
import { Override } from './utilits';

export type GreyColor = {
  0: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  5008: string;
  50012: string;
  50016: string;
  50024: string;
  50032: string;
  50048: string;
  50056: string;
  50080: string;
};
type CustomAction = {
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
  hoverOpacity: number;
  disabledOpacity: number;
};

type CustomBackground = TypeBackground & {
  neutral: string;
};

export type Gradient = {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  themeBase: string;
};

type DefaultPalette = Override<
  Palette['primary'],
  {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
  }
>;

export type CustomPalette = Override<
  Palette,
  {
    default: DefaultPalette;
    grey: GreyColor;
    action: CustomAction;
    background: CustomBackground;
    gradient: Gradient;
  }
>;
