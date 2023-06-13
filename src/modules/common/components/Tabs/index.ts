import { CustomTabs } from './CustomTabs';
import { CustomTabPanel } from './CustomTabPanel';

export * from './CustomTabs';
export * from './CustomTabPanel';

export const Tabs = Object.assign(CustomTabs, {
  Panel: CustomTabPanel,
});
