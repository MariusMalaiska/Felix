import React from "react";
import Button from "../components/Button";
import "../index.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // handleSubmit = event => {
  //   event.preventDefault();
  //   console.log(this.state.username);
  //   console.log(this.state.password);
  // };
  handleSubmit = async event => {
    event.preventDefault();
    // console.log(this.state.name);
    try {
      await fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: `tester`, password: `netflix` })
      }).then(response => {
        if (!response.ok) {
          throw response;
        }
        console.log(response.json());
        return response.json();
      });
    } catch (e) {
      console.log(await e);
    }
  };

  render() {
    return (
      <div className="SignIn">
        <div className="SignIn-box">
          <form onSubmit={this.handleSubmit}>
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
              onChange={e => this.setPassword(e.target.value)}
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

export default Login;
