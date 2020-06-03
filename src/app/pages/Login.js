import React from "react";
import Button from "../components/Button";
import "../index.css";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  // (localStorage.token) ?    this.props.history.replace("/content"): console.log("token found");

  login = async event => {
    event.preventDefault();

    fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
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
        this.props.history.replace("/content");
        // console.log(json.token);
      });
  };

  render() {
    return (
      <div className="SignIn">
        <div className="SignIn-box">
          <form onSubmit={this.login}>
            <label className="Label" htmlFor="userName">
              Username
            </label>
            <input
              className="Input"
              type="text"
              onChange={e => this.setState({ username: e.target.value })}
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
              onChange={e => this.setState({ password: e.target.value })}
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
  }
}

export default withRouter(Login);
