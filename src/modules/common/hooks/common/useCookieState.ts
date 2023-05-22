import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Cookies, { CookieAttributes } from 'js-cookie';

export const useCookieState = <V>(
  key: string,
  initialValue: V,
  options: CookieAttributes = { secure: true, sameSite: 'strict', path: '/' },
) => {
  const [value, setValue] = useState<V>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
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
    }

    return initialValue;
  });

  useEffect(() => {
    if (window.localStorage) {
      Cookies.set(key, JSON.stringify(value), { ...options });
    }
  }, [value, key, options]);

  return [value, setValue] as [V, Dispatch<SetStateAction<V>>];
};
