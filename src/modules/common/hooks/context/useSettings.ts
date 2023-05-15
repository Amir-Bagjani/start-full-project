import { useContext } from 'react';
import { SettingContext } from 'context/SettingContext';

export const useSettings = () => {
  const ctx = useContext(SettingContext);

  if (!ctx) throw new Error(`useSettings must use inside SettingProvider`);

  return ctx;
};
