import Cookies from 'js-cookie';
import { Constants } from 'utils/constants';

//types
import { User } from 'models/User.type';

//TODO: turn this class to function for improve performance

class TokenServices {
  #user: User | null;
  constructor() {
    this.#user = null;
  }

  getUser() {
    return this.#user;
  }

  setUser(user: User) {
    this.#user = user;
  }

  logoutUser() {
    this.#user = null;
  }

  getRefreshToken() {
    const rtoken = this.#user?.refresh;
    return !!this.#user ? rtoken : null;
  }

  getLocalAccessToken() {
    const token = Cookies.get(Constants.AccessTokenName);
    return token;
  }

  setLocalAccessToken(token: string) {
    Cookies.set(Constants.AccessTokenName, token, { secure: true, sameSite: 'strict', path: '/' });
  }

  removeLocalAccessToken() {
    Cookies.set(Constants.AccessTokenName, '');
    Cookies.set(Constants.UserStorageName, '');
    this.logoutUser();
  }
}

export const TokenService = new TokenServices();
