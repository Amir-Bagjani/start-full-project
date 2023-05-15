import { ColorPreset, PresetKey } from 'theme/models';
import { commonPalette } from 'theme/themeProperty';

export const colorPresets = [
  // DEFAULT
  {
    name: 'default',
    ...commonPalette.primary,
  },
  // GREEN
  {
    name: 'green',
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
];

export const defaultPreset: ColorPreset = colorPresets[0];
export const greenPreset: ColorPreset = colorPresets[1];
export const cyanPreset: ColorPreset = colorPresets[2];
export const orangePreset: ColorPreset = colorPresets[3];
export const redPreset: ColorPreset = colorPresets[4];

export const colorPreset = (presetsKey: PresetKey): ColorPreset => {
  return {
    green: greenPreset,
    cyan: cyanPreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
  }[presetsKey];
};
