export const isFetchingLogin = state => state.auth.login.loading;
export const getAccessToken = state => state.auth.token;
export const getLoginErrorMessage = state => {
  //   console.log(state);
  const error = state.auth.login.error;

  return (error && error.response && error.response.message) || null;
};
