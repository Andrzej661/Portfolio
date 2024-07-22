// loginState.ts

export let loginState = false; // Initialize the global login state

export const setLoginState = (state: boolean) => {
  global.loginState = state;
};

export const getLoginState = (): boolean => {
  return global.loginState;
};
