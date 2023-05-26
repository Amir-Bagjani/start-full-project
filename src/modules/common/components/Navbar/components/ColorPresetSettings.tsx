import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

//components & utils
import { colorPresets } from 'theme/utils';
import { useSettings } from 'modules/common/hooks';

//types
import { PresetKey } from 'theme/models';

const colorOption = colorPresets.map((color) => ({
  name: color.name,
  value: color.main,
})) as { name: PresetKey; value: string }[];

export const ColorPresetSettings = () => {
  const { changeColor, themeColorPresets } = useSettings();

  return (
    <ColorContainer>
      {colorOption.map(({ name, value }) => (
        <ColorWrapper
          key={name}
          onClick={() => changeColor(name)}
          presetcolor={value}
          selected={themeColorPresets === name}
        >
          <div className={`colorBox ${themeColorPresets === name ? 'selected' : ''}`} />
        </ColorWrapper>
      ))}
    </ColorContainer>
  );
};

type ColorWrapperProps = {
  selected: boolean;
  presetcolor: string;
};
const ColorContainer = styled('div')(() => ({
  padding: '1rem',
  paddingInlineStart: '0.2rem',
  display: 'grid',
  gap: '1rem',
  rowGap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
}));

const ColorWrapper = styled(Box)<ColorWrapperProps>(({ theme, selected, presetcolor }) => ({
  width: 60,
  height: 60,
  cursor: 'pointer',
  display: 'grid',
  placeContent: 'center',
  border: '1px solid',
  borderColor: theme.palette.grey[500_12],
  borderRadius: theme.shape.borderRadius,
  ...(selected && { boxShadow: `inset 0 4px 8px 0 ${alpha(presetcolor, 0.24)}` }),

  '& > .colorBox': {
    width: 24,
    height: 14,
    borderRadius: '50%',
    backgroundColor: presetcolor,
    transform: 'rotate(-45deg)',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
    }),
    ...(selected && { transform: 'none' }),
  },
}));
