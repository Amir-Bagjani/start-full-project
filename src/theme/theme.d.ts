import { PaletteOptions } from '@mui/material/styles';
import { CustomShadows, CustomTypography, Shape } from 'theme/models';

declare module '@mui/material/styles' {
  //add custom shadows and shape to theme object
  //add custom typography to theme object
  interface Theme {
    customShadows: CustomShadows;
    shape: Shape;
    typography: CustomTypography;
  }

  interface ThemeOptions {
    typography: CustomTypography;
    customShadows: CustomShadows;
    shape: Shape;
  }

  // interface PaletteOptions {
  //   grey: {
  //     0: string;
  //     50: string;
  //     100: string;
  //     200: string;
  //     300: string;
  //     400: string;
  //     500: string;
  //     600: string;
  //     700: string;
  //     800: string;
  //     900: string;
  //     5008: string;
  //     50012: string;
  //     50016: string;
  //     50024: string;
  //     50032: string;
  //     50048: string;
  //     50056: string;
  //     50080: string;
  //   };
  // }
  // ColorPartial
  //add lighter and darker property to palette
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}
