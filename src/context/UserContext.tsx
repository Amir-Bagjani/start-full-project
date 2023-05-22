import { createContext, useMemo } from 'react';
import { useCookieState } from 'modules/common/hooks';

//types
import type { ReactNode } from 'react';
import { User } from 'models/User.type';
import { Constants } from 'utils/constants';

type ProviderProps = { children: ReactNode };
type UseCustomSetting = ReturnType<typeof useCustomUserContext>;

/**
 * TODO: backend should implement /api/getme/ route that returns user data wih access token
 * TODO: frontend should save only refresh token in browser storage and all user data should stores in local variable
 */

export const UserContext = createContext({} as UseCustomSetting);

const useCustomUserContext = () => {
  const [user, setUser] = useCookieState<User | null>(Constants.UserStorageName, null);

  // const { mutate, isLoading } = useRefreshTokenAPI();

  // useEffect(() => {
  //   if (!!user) {
  //     mutate({ refresh: user.refresh }, { onSuccess: (data) => {
  //       //get user data with token
  //     } });
  //   }
  // }, [mutate, user]);

  return useMemo(
    () => ({
      user,
      // loadingUser: isLoading,
      login: (u: User) => setUser(u),
      logout: () => setUser(null),
    }),
    [setUser, user],
  );
};

export const UserProvider = ({ children }: ProviderProps) => {
  return <UserContext.Provider value={useCustomUserContext()}>{children}</UserContext.Provider>;
};
