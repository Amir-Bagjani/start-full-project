import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  CardActionArea,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useSettings } from 'modules/common/hooks';
import { colorPresets } from 'theme/utils';
import { PresetKey } from 'theme/models';

const colorOption = colorPresets.map((color) => ({
  name: color.name,
  value: color.main,
}));
const ColorMap = colorOption.map((i) => i.name);

console.log('colorPresets', colorOption);

export const ColorPresetSettings = () => {
  const { changeColor, themeColorPresets } = useSettings();

  return (
    <FormControl>
      <FormLabel id='demo-controlled-radio-buttons-group'>color palette</FormLabel>
      <RadioGroup
        aria-labelledby='demo-controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={themeColorPresets}
        onChange={(_, v) => changeColor(v as PresetKey)}
      >
        {ColorMap.map((i) => (
          <FormControlLabel value={i} key={i} control={<Radio />} label={i} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
