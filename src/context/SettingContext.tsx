import { ReactNode, createContext, useMemo } from 'react';

//utils
import { colorPreset } from 'theme/utils';
import { DefaultSettings } from 'utils/configuration';
import { useBrowserstorageState } from 'modules/common/hooks';

//types
import { PresetKey } from 'theme/models';
import { DefaultSettingsType } from 'models';

type UseCustomSetting = ReturnType<typeof useCustomSetting>;

export const SettingContext = createContext({} as UseCustomSetting);

const initialState = {
  themeMode: DefaultSettings.themeMode,
  themeColorPresets: DefaultSettings.themeColorPresets,
};

const useCustomSetting = () => {
  const [settings, setSettings] = useBrowserstorageState<DefaultSettingsType>(
    'settings',
    initialState,
  );

  //   useMemo(() => {
  //     if (settings.themeMode !== ('light' || 'dark')) setSettings(initialState);
  //     if (![].includes(settings.themeColorPresets)) setSettings(initialState);
  //   }, [setSettings, settings.themeColorPresets, settings.themeMode]);

  const value = useMemo(
    () => ({
      ...settings,
      chooseColor: colorPreset(settings.themeColorPresets),
      changeColor: (presetColor: PresetKey) => {
        setSettings((pre) => ({ ...pre, themeColorPresets: presetColor }));
      },
      toggleTheme: () => {
        setSettings((pre) => ({
          ...pre,
          themeMode: pre.themeMode === 'light' ? 'dark' : 'light',
        }));
      },
    }),
    [setSettings, settings],
  );

  return value;
};

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  return <SettingContext.Provider value={useCustomSetting()}>{children}</SettingContext.Provider>;
};
