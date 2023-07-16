/**
 *
 * @returns sessionSate
 *
 * It gets data from local storage and stores it in session storage of it's own tab,
 * next, remove the local storage of browser and return the value of it's own session storage
 */

export const getStateFromBrowserStorage = () => {
  let localState = null;
  const state = JSON.parse(localStorage.getItem('id-state') as string);
  if (state) {
    localState = state;
    localStorage.removeItem('id-state');
    sessionStorage.setItem('id-state', JSON.stringify(localState));
  }

  const sessionSate = JSON.parse(sessionStorage.getItem('id-state') as string);

  return sessionSate;
};
