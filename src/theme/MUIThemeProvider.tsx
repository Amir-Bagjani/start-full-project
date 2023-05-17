import { prefixer } from 'stylis';
import { ReactNode, useMemo } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import {
  shape,
  shadows,
  typography,
  breakpoints,
  darkPalette,
  lightPalette,
  customShadows,
} from './themeProperty';
import { componentsOverride } from './overrides';
import { useSettings } from 'modules/common/hooks';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const MUIThemeProvider = ({ children }: { children: ReactNode }) => {
  const { typography: MuiTypography } = useTheme();

  const { themeMode, chooseColor } = useSettings();

  const theme = useMemo(
    () =>
      createTheme({
        palette: themeMode === 'light' ? lightPalette : darkPalette,
        breakpoints,
        typography: { ...MuiTypography, ...typography },
        shadows: themeMode === 'light' ? shadows.light : shadows.dark,
        customShadows: themeMode === 'light' ? customShadows.light : customShadows.dark,
        shape,
      }),
    [MuiTypography, themeMode],
  );

  useMemo(() => {
    //set custom palette
    theme.palette.primary = chooseColor;
    //set override components
    theme.components = componentsOverride(theme);
  }, [chooseColor, theme]);

  return (
    <CacheProvider value={cacheRtl}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};
