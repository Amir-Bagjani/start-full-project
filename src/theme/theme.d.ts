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

  //remove old keys for breakpoints and new keys
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    zero: true;
    mobile: true;
    tablet: true;
    lgTablet: true;
    smLaptop: true;
    lgLaptop: true;
    smdesktop: true;
    mddesktop: true;
    lgdesktop: true;
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
