import { createContext, useMemo } from 'react';
import { useCookieState } from 'modules/common/hooks';

//utils
import { Constants } from 'utils/constants';

//types
import type { ReactNode } from 'react';
import { User } from 'models/User.type';
import { TokenService } from 'services/utils';

type ProviderProps = { children: ReactNode };
type UseCustomSetting = ReturnType<typeof useCustomUserContext>;

/**
 * TODO: backend should implement /api/getme/ route that returns user data wih access token
 * TODO: frontend should save only refresh token in browser storage and all user data should stores in local variable
 */

export const UserContext = createContext({} as UseCustomSetting);

const useCustomUserContext = () => {
  const [user, setUser] = useCookieState<User | null>(Constants.UserStorageName, null);
  const [, setUserToken] = useCookieState<string | null>(Constants.AccessTokenName, null);

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
      login: (u: User) => {
        setUser(u);
        setUserToken(u.access);
        TokenService.setUser(u);
      },
      logout: () => {
        setUser(null);
        setUserToken(null);
        TokenService.logoutUser();
      },
    }),
    [setUser, setUserToken, user],
  );
};

export const UserProvider = ({ children }: ProviderProps) => {
  return <UserContext.Provider value={useCustomUserContext()}>{children}</UserContext.Provider>;
};
