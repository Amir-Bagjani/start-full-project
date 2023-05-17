import { PaletteOptions } from '@mui/material/styles';
import { CustomShadows, CustomTypography, Shape, CustomPalette } from 'theme/models';

declare module '@mui/material/styles' {
  //add custom shadows and shape to theme object
  //add custom typography to theme object
  //add custom palette to theme object
  interface Theme {
    customShadows: CustomShadows;
    shape: Shape;
    typography: CustomTypography;
    palette: CustomPalette;
  }

  interface ThemeOptions {
    typography: CustomTypography;
    customShadows: CustomShadows;
    shape: Shape;
    palette: CustomPalette;
  }

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
