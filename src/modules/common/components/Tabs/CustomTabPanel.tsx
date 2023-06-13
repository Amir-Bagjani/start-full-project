import { Override } from 'theme/models';
import { PropsWithChildren, ComponentProps } from 'react';

// types
type CustomTabPanelProps = Override<
  ComponentProps<'div'>,
  {
    value: number;
    index: number;
  }
>;

export const CustomTabPanel = (props: PropsWithChildren<CustomTabPanelProps>) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};
