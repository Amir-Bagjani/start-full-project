import { Children } from 'react';
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

//utils
import { useRole } from 'modules/common/hooks';

//types
import { Override } from 'theme/models';
import type { RolesType } from 'models';
import type { ComponentProps } from 'react';

type CustomTabProps = Omit<ComponentProps<typeof CustomTab>, 'label'>;

export type CustomTabsProps<T> = Override<
  ComponentProps<typeof Tabs>,
  {
    options: T[];
    tabProps?: CustomTabProps;
    value: number;
    onChange?: ComponentProps<typeof Tabs>['onChange'];
  }
>;

export const CustomTabs = <T extends { roles?: RolesType[]; label: string; id: number | string }>({
  options,
  tabProps,
  value,
  onChange,
  ...tabsProps
}: CustomTabsProps<T>) => {
  const { includedRole } = useRole();

  return (
    <Tabs
      value={value}
      onChange={onChange}
      TabIndicatorProps={{ sx: { top: '90%', height: '8px', borderRadius: '7px 7px 0 0 ' } }}
      {...tabsProps}
    >
      {Children.toArray(
        options.map((i) => {
          if (!!i.roles) {
            if (includedRole(i.roles)) return <CustomTab label={i.label} {...tabProps} />;
            return null;
          }
          return <CustomTab label={i.label} {...tabProps} />;
        }),
      )}
    </Tabs>
  );
};

const CustomTab = styled(Tab)(() => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: 'transparent',
  fontWeight: 700,
}));
