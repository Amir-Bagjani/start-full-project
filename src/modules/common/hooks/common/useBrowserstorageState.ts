import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const GetStorageMap = {
  localStorage: (key: string) => window.localStorage.getItem(key),
  sessionStorage: (key: string) => window.sessionStorage.getItem(key),
};
const SetStorageMap = {
  localStorage: <T>(key: string, value: T) =>
    window.localStorage.setItem(key, JSON.stringify(value)),
  sessionStorage: <T>(key: string, value: T) =>
    window.sessionStorage.setItem(key, JSON.stringify(value)),
};

export const useBrowserstorageState = <V>(
  key: string,
  initialValue: V | (() => V),
  storage: 'localStorage' | 'sessionStorage' = 'localStorage',
  chekValue?: (v: V) => V,
) => {
  const [value, setValue] = useState<V>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedValue = GetStorageMap[storage](key);

        if (!!savedValue) {
          return !!chekValue ? chekValue(JSON.parse(savedValue)) : JSON.parse(savedValue);
        } else {
          if (typeof initialValue === 'function') {
            return (initialValue as () => V)();
          } else {
            return initialValue;
          }
        }
      } catch (r) {
        return initialValue;
      }
    }

    return initialValue;
  });

  useEffect(() => {
    if (window.localStorage) SetStorageMap[storage](key, value);
  }, [value, key, storage]);

  return [value, setValue] as [V, Dispatch<SetStateAction<V>>];
};
