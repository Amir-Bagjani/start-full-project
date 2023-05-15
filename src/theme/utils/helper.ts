import { BREAK_POINTS } from 'theme/themeProperty';

export const createGradient = (color1: string, color2: string) =>
  `linear-gradient(to bottom, ${color1}, ${color2})`;

export const pxToRem = (value: number) => `${value / 16}rem`;

export const remToPx = (value: number) => `${Math.round(parseFloat(String(value)) * 16)}px`;

export const responsiveFontSize = ({ sm, md, lg }: { sm: number; md: number; lg: number }) => {
  return {
    [`@media (min-width:${BREAK_POINTS.sm}px)`]: { fontSize: pxToRem(sm) },
    [`@media (min-width:${BREAK_POINTS.md}px)`]: { fontSize: pxToRem(md) },
    [`@media (min-width:${BREAK_POINTS.lg}px)`]: { fontSize: pxToRem(lg) },
  };
};
