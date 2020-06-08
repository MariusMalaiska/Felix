import React, { useState, useCallback } from "react";
import Button from "../components/Button";
import "../index.css";
import { withRouter } from "react-router-dom";

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: ""
//     };
//   }

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // (localStorage.token) ?    this.props.history.replace("/content"): console.log("token found");

  // login = async event => {
  const login = useCallback(
    event => {
      event.preventDefault();

      fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // username: this.state.username,
          // password: this.state.password
          username: username,
          password: password
        })
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then(json => {
          localStorage.setItem("token", json.token);
          // this.props.history.replace("/content");
          props.history.replace("/content");
          // console.log(json.token);
        });
    },
    [username, password, props.history]
  );

  // render() {
  return (
    <div className="SignIn">
      <div className="SignIn-box">
        {/* <form onSubmit={this.login}> */}
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
// }

export default withRouter(Login);
