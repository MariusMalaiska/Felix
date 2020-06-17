import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import auth from "../../../auth";

function PrivateRoute({ isAuthenticated, ...props }) {
  // const token = window.localStorage.getItem("token");
  // const token = window.localStorage.getItem("token");
  const location = useLocation();

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Route {...props} />;
  }

  console.log("Will redirect");

  return (
    <Redirect to={{ pathname: "/login", state: { referrer: location } }} />
  );
}

const enhance = connect(state => {
  return {
    isAuthenticated: !!auth.selectors.getAccessToken(state)
  };
});

export default enhance(PrivateRoute);
