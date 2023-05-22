export const BREAK_POINTS = {
  zero: 0,
  mobile: 425,
  tablet: 768,
  lgTablet: 900,
  smLaptop: 1024,
  lgLaptop: 1244,
  smdesktop: 1366,
  mddesktop: 1920,
  lgdesktop: 2440,
} as const;

export const breakpoints = {
  values: BREAK_POINTS,
};
