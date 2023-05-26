import { PresetBackground, PresetKey } from 'theme/models';

export type ThemeType = 'light' | 'dark';

export type DefaultSettingsType = {
  themeMode: ThemeType;
  themeColorPresets: PresetKey;
  backgroundPreset: PresetBackground;
  themeStretch: boolean;
};
