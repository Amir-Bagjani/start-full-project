import { PresetKey } from 'theme/models';

export type ThemeType = 'light' | 'dark';

export type DefaultSettingsType = {
  themeMode: ThemeType;
  themeColorPresets: PresetKey;
  // themeStretch: boolean;
};
