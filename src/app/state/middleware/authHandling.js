import auth from "../../../auth";

const log = ({ dispatch }) => next => action => {
  if (action.type === auth.types.LOGIN_SUCESS) {
    localStorage.setItem("authToken", action.payload.token);
  }

  if (action.error === 401) {
    return dispatch(auth.actions.logout());
  }

  // fake example of logout - need to add to redux auth module action creators and types
  // if (action.type === auth.types.LOGOUT_SUCESS) {
  //   localStorage.removeItem("authToken");
  // }

  return next(action);
};

export default log;
