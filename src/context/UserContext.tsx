import { ReactNode, createContext, useMemo } from 'react';
import { useBrowserstorageState } from 'modules/common/hooks';

//types
import { User } from 'models/User.type';

type UseCustomSetting = ReturnType<typeof useCustomUserContext>;

export const UserContext = createContext({} as UseCustomSetting);

const useCustomUserContext = () => {
  const [user, setUser] = useBrowserstorageState<User | null>('uuuuser', null);
  return useMemo(
    () => ({
      user,
      login: (u: User) => setUser(u),
      logout: () => setUser(null),
    }),
    [setUser, user],
  );
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return <UserContext.Provider value={useCustomUserContext()}>{children}</UserContext.Provider>;
};
