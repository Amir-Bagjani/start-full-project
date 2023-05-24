import { ThemeType } from 'models';
import { commonPalette, primaryPaletteDark } from 'theme/themeProperty';
import { ColorPreset, PresetKey } from 'theme/models';

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
