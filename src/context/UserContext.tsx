import { User } from 'models/User.type';
import { ReactNode, createContext, useMemo, useState } from 'react';

type UseCustomSetting = ReturnType<typeof useCustomUserContext>;

export const UserContext = createContext({} as UseCustomSetting);

const useCustomUserContext = () => {
  const [user, setUser] = useState<User | null>(null);
  return useMemo(
    () => ({
      user,
      login: (u: User) => setUser(u),
      logout: () => setUser(null),
    }),
    [user],
  );
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return <UserContext.Provider value={useCustomUserContext()}>{children}</UserContext.Provider>;
};
