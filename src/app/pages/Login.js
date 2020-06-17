import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import "../index.css";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import auth from "../../auth";

// const Login = ({
//   login,
//   setToken,
//   history,
//   loading,
//   error,
//   isAuthenticated,
//   token
// }) => {
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [token, setToken] = useState("");

const Login = ({ login, loading, error, isAuthenticated, token }) => {
  let emailInput = React.createRef();
  // let passwordInput = React.createRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/content");
      // } else {
      //   emailInput.focus();
    }
  }, [username, history, isAuthenticated, token, emailInput]);

  const signIn = e => {
    e.preventDefault();
    login(username, password);
  };

  // const revealPassword = () => {
  //   setShowPassword((prevState) => !prevState);
  // };

  return (
    <div className="SignIn">
      <div className="SignIn-box">
        <form onSubmit={signIn}>
          <label className="Label" htmlFor="userName">
            Username
          </label>
          <input
            ref={input => {
              emailInput = input;
            }}
            className="Input"
            type="text"
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            id="userName"
            name="userName"
          />
          <label className="Label" htmlFor="password">
            Password
          </label>
          <input
            // ref={input => {
            //   passwordInput = input;
            // }}
            className="Input Password"
            autoComplete="current-password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="pasword"
            name="password"
          />
          <Button size="large" type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

// function mapDispatchToProps(dispatch) {
//   return { setToken: token => dispatch({ type: "SET_TOKEN", token }) };
// }
// export default connect(null, mapDispatchToProps)(withRouter(Login));

const enhance = compose(
  withRouter,
  connect(
    state => {
      return {
        error: auth.selectors.getLoginErrorMessage(state),
        loading: auth.selectors.isFetchingLogin(state),
        isAuthenticated: !!auth.selectors.getAccessToken(state),
        token: auth.selectors.getAccessToken(state)
      };
    },
    dispatch => {
      return {
        login: bindActionCreators(auth.actions.login, dispatch)
      };
    }
  )
);

export default enhance(Login);
