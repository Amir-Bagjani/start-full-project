import { ThemeType } from 'models';
import {
  commonPalette,
  // deepBackground,
  lightBackground,
  blackBackground,
  primaryPaletteDark,
  paleBlackBackground,
} from 'theme/themeProperty';
import { BackgroundPreset, ColorPreset, PresetBackground, PresetKey } from 'theme/models';

export const colorPresets = [
  // DEFAULT
  {
    name: 'default',
    ...commonPalette.primary,
  },
  // SECONDARY
  {
    name: 'secondary',
    ...commonPalette.secondary,
  },
  // CYAN
  {
    name: 'cyan',
    ...commonPalette.info,
  },
  // ORANGE
  {
    name: 'orange',
    ...commonPalette.warning,
  },
  // RED
  {
    name: 'red',
    ...commonPalette.error,
  },
  // GREEN
  {
    name: 'green',
    ...commonPalette.success,
  },
];

export const backgroundPrests = [
  // DEFAULT
  {
    name: 'default',
    ...lightBackground,
  },
  //paleBlack
  {
    name: 'paleBlack',
    ...paleBlackBackground,
  },
  //black
  {
    name: 'black',
    ...blackBackground,
  },
  // //deepBlack
  // {
  //   name: 'deepBlack',
  //   ...deepBackground,
  // },
];

export const defaultPresetDark: ColorPreset = {
  ...primaryPaletteDark,
  name: 'default',
  contrastText: '#fff',
};
export const defaultPreset: ColorPreset = colorPresets[0];
export const secondaryPreset: ColorPreset = colorPresets[1];
export const cyanPreset: ColorPreset = colorPresets[2];
export const orangePreset: ColorPreset = colorPresets[3];
export const redPreset: ColorPreset = colorPresets[4];
export const greenPreset: ColorPreset = colorPresets[5];

export const defaultBackgroundPreset: BackgroundPreset = backgroundPrests[0];
export const paleBlackBackgroundPreset: BackgroundPreset = backgroundPrests[1];
export const blackBackgroundPreset: BackgroundPreset = backgroundPrests[2];
// export const deepBlackBackgroundPreset: BackgroundPreset = backgroundPrests[3];

export const colorPreset = (presetsKey: PresetKey, themMode: ThemeType): ColorPreset => {
  return {
    secondary: secondaryPreset,
    cyan: cyanPreset,
    orange: orangePreset,
    red: redPreset,
    green: greenPreset,
    default: themMode === 'light' ? defaultPreset : defaultPresetDark,
  }[presetsKey];
};

export const backgroundPreset = (bgPreset: PresetBackground) => {
  return {
    default: defaultBackgroundPreset,
    paleBlack: paleBlackBackgroundPreset,
    black: blackBackgroundPreset,
    // deepBlack: deepBlackBackgroundPreset,
  }[bgPreset];
};
