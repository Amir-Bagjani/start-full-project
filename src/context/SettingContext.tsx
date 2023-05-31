import { ReactNode, createContext, useMemo } from 'react';

//utils
import { DefaultSettings } from 'utils/configuration';
import { backgroundPreset, colorPreset } from 'theme/utils';
import { useBrowserstorageState } from 'modules/common/hooks';

//types
import { DefaultSettingsType } from 'models';
import { validationObject } from 'utils/helper';
import { PresetBackground, PresetKey } from 'theme/models';

type UseCustomSetting = ReturnType<typeof useCustomSetting>;

export const SettingContext = createContext({} as UseCustomSetting);

const initialState = {
  themeMode: DefaultSettings.themeMode,
  themeColorPresets: DefaultSettings.themeColorPresets,
  backgroundPreset: DefaultSettings.backgroundPreset,
  themeStretch: DefaultSettings.themeStretch,
};

const checker = (value: DefaultSettingsType) => {
  if (
    typeof value === 'object' &&
    validationObject(value, {
      themeMode: ['light', 'dark'],
      themeColorPresets: ['default', 'green', 'cyan', 'orange', 'red', 'secondary'],
      backgroundPreset: ['default', 'paleBlack', 'black'],
      themeStretch: ['false', 'true'],
    })
  )
    return value;

  return initialState;
};

const useCustomSetting = () => {
  const [settings, setSettings] = useBrowserstorageState<DefaultSettingsType>(
    'settings',
    initialState,
    'localStorage',
    checker,
  );

  const value = useMemo(
    () => ({
      ...settings,

      chooseColor: colorPreset(settings.themeColorPresets, settings.themeMode),
      changeColor: (presetColor: PresetKey) => {
        setSettings((pre) => ({ ...pre, themeColorPresets: presetColor }));
      },

      chooseBackground: backgroundPreset(settings.backgroundPreset),
      changeBackground: (presetBackground: PresetBackground) => {
        setSettings((pre) => ({
          ...pre,
          themeMode: presetBackground === 'default' ? 'light' : 'dark',
          backgroundPreset: presetBackground,
        }));
      },

      toggleTheme: () => {
        setSettings((pre) => ({
          ...pre,
          themeMode: pre.themeMode === 'light' ? 'dark' : 'light',
          backgroundPreset: pre.themeMode === 'light' ? 'black' : 'default',
        }));
      },

      toggleStretch: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setSettings((pre) => ({ ...pre, themeStretch: !pre.themeStretch }));
      },
      exitFullScreen: () => {
        if (document.fullscreenElement === null) return;
        document.exitFullscreen();
      },

      resetSettings: () => {
        setSettings(initialState);
        document.exitFullscreen();
      },
    }),
    [setSettings, settings],
  );

  return value;
};

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  return <SettingContext.Provider value={useCustomSetting()}>{children}</SettingContext.Provider>;
};
