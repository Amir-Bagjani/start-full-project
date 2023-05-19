import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const GetStorageMap = {
  localStorage: (key: string) => window.localStorage.getItem(key),
  sessionStorage: (key: string) => window.sessionStorage.getItem(key),
};
const SetStorageMap = {
  localStorage: (key: string, value: any) =>
    window.localStorage.setItem(key, JSON.stringify(value)),
  sessionStorage: (key: string, value: any) =>
    window.sessionStorage.setItem(key, JSON.stringify(value)),
};

export const useBrowserstorageState = <V>(
  key: string,
  initialValue: V | (() => V),
  storage?: 'localStorage' | 'sessionStorage',
  chekValue?: (v: V) => V,
) => {
  const [value, setValue] = useState<V>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedValue = GetStorageMap[storage ?? 'localStorage'](key);

      if (!!savedValue) {
        return !!chekValue ? chekValue(JSON.parse(savedValue)) : JSON.parse(savedValue);
      } else {
        if (typeof initialValue === 'function') {
          return (initialValue as () => V)();
        } else {
          return initialValue;
        }
      }
    }

    return initialValue;
  });

  useEffect(() => {
    if (window.localStorage) SetStorageMap[storage ?? 'localStorage'](key, value);
  }, [value, key, storage]);

  return [value, setValue] as [V, Dispatch<SetStateAction<V>>];
};
