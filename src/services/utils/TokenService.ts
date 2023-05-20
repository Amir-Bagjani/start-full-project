import { Constants } from 'utils/constants';

//TODO: turn this class to function for improve performance

class TokenServices {
  #user: any;
  constructor() {
    this.#user = null;
  }

  getUser() {
    return this.#user;
  }

  setUser(user: any) {
    this.#user = user;
  }

  getRefreshToken() {
    // const rtoken = this.#user?.refresh
    const localstorageUser = localStorage.getItem(Constants.UserStorageName);
    if (!!localstorageUser) {
      const user = JSON.parse(localstorageUser);
      return user ? user.refresh : null;
    }
    // return !!this.#user ? rtoken : null;
  }

  getLocalAccessToken() {
    const token = localStorage.getItem(Constants.AccessTokenName);
    // const token = JSON.parse(localStorage.getItem(Constants.AccessTokenName));
    return token;
  }

  setLocalAccessToken(token: any) {
    localStorage.setItem(Constants.AccessTokenName, token);
    // localStorage.setItem(Constants.AccessTokenName, JSON.stringify(token));
  }

  removeLocalAccessToken() {
    localStorage.removeItem(Constants.AccessTokenName);
    //TODO: should remove this line
    localStorage.removeItem(Constants.UserStorageName);
  }
}

export const TokenService = new TokenServices();
