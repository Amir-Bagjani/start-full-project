import { ReactNode, createContext, useMemo } from 'react';

//utils
import { colorPreset } from 'theme/utils';
import { DefaultSettings } from 'utils/configuration';
import { useBrowserstorageState } from 'modules/common/hooks';

//types
import { PresetKey } from 'theme/models';
import { DefaultSettingsType } from 'models';
import { validationObject } from 'utils/helperFunctions';

type UseCustomSetting = ReturnType<typeof useCustomSetting>;

export const SettingContext = createContext({} as UseCustomSetting);

const initialState = {
  themeMode: DefaultSettings.themeMode,
  themeColorPresets: DefaultSettings.themeColorPresets,
  // themeStretch: DefaultSettings.themeStretch,
};

const checker = (value: DefaultSettingsType) => {
  if (
    typeof value === 'object' &&
    validationObject(value, {
      themeMode: ['light', 'dark'],
      themeColorPresets: ['default', 'green', 'cyan', 'orange', 'red'],
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
      chooseColor: colorPreset(settings.themeColorPresets),

      changeColor: (presetColor: PresetKey) => {
        setSettings((pre) => ({ ...pre, themeColorPresets: presetColor }));
      },
      toggleTheme: () => {
        setSettings((pre) => ({ ...pre, themeMode: pre.themeMode === 'light' ? 'dark' : 'light' }));
      },
      resetSettings: () => {
        setSettings(initialState);
      },
      // toggleStretch: () => {
      //   if (!document.fullscreenElement) {
      //     document.documentElement.requestFullscreen();
      //     setSettings((pre) => ({ ...pre, themeStretch: true }));
      //   } else if (document.exitFullscreen) {
      //     document.exitFullscreen();
      //     setSettings((pre) => ({ ...pre, themeStretch: false }));
      //   }
      // },
    }),
    [setSettings, settings],
  );

  return value;
};

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  return <SettingContext.Provider value={useCustomSetting()}>{children}</SettingContext.Provider>;
};
