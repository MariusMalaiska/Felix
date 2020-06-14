// -----------------------Frame works, Library, Css/Scss imports --------------------
import React, { useCallback, useState } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "./index.css";
import "./styles/scss/styles.scss";
// -----------------------------image imports ---------------------------------------
import logo from "./styles/images/F.svg";
import card from "./styles/images/credit-card.svg";
// -----------------------------React-redux/ state / types----------------------------------
import { connect } from "react-redux";
// import content from "../../../content";
// -----------------------------Components import ----------------------------------
import Button from "./components/Button";
import PrivateRoute from "./components/PrivateRoute";
// -----------------------------Pages import ----------------------------------
import Home from "./pages/Home";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Single from "./pages/Single";

const App = props => {
  const [favorites, setFavorites] = useState([]);

  const logout = useCallback(async () => {
    try {
      const result = await fetch(
        "https://academy-video-api.herokuapp.com/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token: localStorage.getItem("token") })
        }
      );
      if (!result.ok) {
        throw result.json();
      }
      console.log(result);
      localStorage.clear();
      props.setToken("");
      props.history.replace("/");
    } catch {
      console.log("woops somthin went wrong on logout");
    }
  }, [props]);

  return (
    <div className="App">
      <div className="Container">
        <header className="App-header">
          <ul>
            <li>
              <Link to="/">
                <img className="Logo" alt="felix logo" src={logo}></img>
              </Link>
            </li>
            <li>
              {localStorage.token === undefined ? (
                <Button to="/login" size="small">
                  Sign in
                </Button>
              ) : (
                <Button onClick={logout} size="small">
                  Logout
                </Button>
              )}
            </li>
          </ul>
        </header>

        <Switch>
          <Route exact path="/">
            <Home favorites={favorites} setFavorites={setFavorites} />
          </Route>
          <Route exact path="/login" Component={Login}>
            <Login />
          </Route>
          <PrivateRoute exact path="/content" Component={Content}>
            <Content favorites={favorites} setFavorites={setFavorites} />
          </PrivateRoute>
          <Route exact path="/content/:id">
            <Single />
          </Route>
        </Switch>

        <footer className="Footer">
          <p className="Copyright">
            We care about your entertainment. Copyright © 2019–2020 felix.com
          </p>
          <div className="Cards">
            <ul>
              <li>
                <a href="www.visa.com">
                  <img className="Card" alt="Visa card logo" src={card}></img>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};
// export default withRouter(App);

function mapDispatchToProps(dispatch) {
  return { setToken: token => dispatch({ type: "SET_TOKEN", token }) };
}
export default connect(null, mapDispatchToProps)(withRouter(App));
