import Cookies, { CookieAttributes } from 'js-cookie';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useCookieState = <V extends unknown>(
  key: string,
  initialValue: V,
  options: CookieAttributes = { secure: true, sameSite: 'strict', path: '/' },
) => {
  const [value, setValue] = useState<V>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedValue = Cookies.get(key);
        if (!!savedValue) {
          return JSON.parse(savedValue);
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
    if (window.localStorage) {
      if (!value) {
        Cookies.remove(key);
        return;
      }
      Cookies.set(key, JSON.stringify(value), { ...options });
    }
  }, [value, key, options]);

  return [value, setValue] as [V, Dispatch<SetStateAction<V>>];
};
