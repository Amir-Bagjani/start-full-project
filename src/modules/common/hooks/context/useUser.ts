import { useContext } from 'react';
import { UserContext } from 'context/UserContext';

export const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) throw new Error(`useUser must use inside UserProvider`);

  return ctx;
};
