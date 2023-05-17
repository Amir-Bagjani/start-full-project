//utils
import { BREAK_POINTS } from './breakpoints';
import { CustomTypography } from 'theme/models';

export const pxToRem = (value: number) => `${value / 16}rem`;
export const remToPx = (value: number) => `${Math.round(parseFloat(String(value)) * 16)}px`;

export const responsiveFontSize = ({ sm, md, lg }: { sm: number; md: number; lg: number }) => {
  return {
    [`@media (min-width:${BREAK_POINTS.sm}px)`]: { fontSize: pxToRem(sm) },
    [`@media (min-width:${BREAK_POINTS.md}px)`]: { fontSize: pxToRem(md) },
    [`@media (min-width:${BREAK_POINTS.lg}px)`]: { fontSize: pxToRem(lg) },
  };
};

const FONT_PRIMARY = 'Montserrat, Public Sans, Arial, sans-serif'; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

export const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightLight: 200,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontSize: pxToRem(40),
    fontWeight: 700,
    lineHeight: 80 / 64,
    letterSpacing: 2,
    ...responsiveFontSize({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontSize: pxToRem(32),
    fontWeight: 700,
    lineHeight: 64 / 48,
    ...responsiveFontSize({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontSize: pxToRem(24),
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSize({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontSize: pxToRem(20),
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSize({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontSize: pxToRem(18),
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSize({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontSize: pxToRem(17),
    fontWeight: 700,
    lineHeight: 28 / 18,
    ...responsiveFontSize({ sm: 18, md: 18, lg: 18 }),
  },
  body1: {
    fontSize: pxToRem(16),
    lineHeight: 1.5,
  },
  body2: {
    fontSize: pxToRem(14),
    lineHeight: 22 / 14,
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    fontWeight: 600,
  },
  subtitle2: {
    fontSize: pxToRem(14),
    lineHeight: 22 / 14,
    fontWeight: 700,
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.5,
    fontWeight: 600,
  },
  button: {
    textTransform: 'capitalize',
    fontSize: pxToRem(14),
    fontWeight: 700,
    lineHeight: 24 / 14,
  },
  overline: {
    textTransform: 'uppercase',
    fontSize: pxToRem(12),
    fontWeight: 700,
    lineHeight: 1.5,
  },
} as CustomTypography;
