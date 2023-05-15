type VariantTypography = {
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textTransform?: any;
};

export type CustomTypography = {
  fontSize?: number;
  htmlFontSize?: number;
  pxToRem?: (px: number) => string;
  fontFamily: string;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: VariantTypography;
  h2: VariantTypography;
  h3: VariantTypography;
  h4: VariantTypography;
  h5: VariantTypography;
  h6: VariantTypography;
  body1: VariantTypography;
  body2: VariantTypography;
  subtitle1: VariantTypography;
  subtitle2: VariantTypography;
  caption: VariantTypography;
  button: VariantTypography;
  overline: VariantTypography;
};
