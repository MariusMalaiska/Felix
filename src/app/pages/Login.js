import React, { useState, useCallback } from "react";
import Button from "../components/Button";
import "../index.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");

  const login = useCallback(
    async event => {
      event.preventDefault();
      try {
        const result = await fetch(
          `https://academy-video-api.herokuapp.com/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }
        );
        if (!result.ok) {
          throw result.json();
        }
        const json = await result.json();
        localStorage.setItem("token", json.token);
        props.setToken(json.token);
        await props.history.replace("/content");
      } catch {
        console.log("wrong email or password");
      }
    },
    [username, password, props]
  );

  return (
    <div className="SignIn">
      <div className="SignIn-box">
        <form onSubmit={login}>
          <label className="Label" htmlFor="userName">
            Username
          </label>
          <input
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

function mapDispatchToProps(dispatch) {
  return { setToken: token => dispatch({ type: "SET_TOKEN", token }) };
}
export default connect(null, mapDispatchToProps)(withRouter(Login));
