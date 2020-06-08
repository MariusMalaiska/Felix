import React, { useCallback, useState } from "react";
import "./index.css";
import logo from "./styles/images/F.svg";
import card from "./styles/images/credit-card.svg";
import "./styles/scss/styles.scss";

import Button from "./components/Button";
// import Movie from "./components/Movies";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Content from "./pages/Content";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route, Link, withRouter } from "react-router-dom";

// class App extends Component {
const App = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     items: [],
  //     favorites: [],
  //     isLoaded: false
  //     // isLoggedIn: false
  //   };
  // }
  //-------------is assigned a value but never used   ------
  // const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  //---------------------------------------------------------
  // changeButton = id => {
  //   let { favorites } = this.state;
  //   console.log(id);
  //   if (favorites.includes(id)) {
  //     this.setState({ favorites: favorites.filter(el => el !== id) });
  //   } else {
  //     this.setState({ favorites: favorites.concat(id) });
  //   }
  // };
  // logout = () => {
  const logout = useCallback(() => {
    fetch("https://academy-video-api.herokuapp.com/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ token: localStorage.getItem("token") })
    }).then(response => {
      if (!response.ok) {
        throw response;
      }
      console.log(response);
      localStorage.clear();
      props.history.replace("/");
    });
    // .then(response => {
    //   console.log(response);
    //   localStorage.clear();
    // });
  }, [props.history]);

  // componentDidMount = async () => {
  //   try {
  //     fetch(`https://academy-video-api.herokuapp.com/content/free-items`)
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({
  //           isLoaded: true,
  //           items: json,
  //           button: false
  //         });
  //       });
  //   } catch (e) {
  //     console.log(await e);
  //   }
  // };

  // render() {
  // const { isLoaded, items } = this.state;

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
                // <Button onClick={this.logout} size="small">
                <Button onClick={logout} size="small">
                  Logout
                </Button>
              )}
            </li>
          </ul>

          {/* <Link className="Button" to="/login">
                Sign in
              </Link> */}

          {/* <Button size="small" type="submit"> */}
          {/* </Button> */}
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
        </Switch>

        {/* <div className="Hero">
              <h1>Wanna more Content ?</h1>
              <Button size="large">Get Access</Button>
            </div>
            <div className="Gray-line" />
            <div className="Movies">
              {!isLoaded ? (
                <h4> loading...</h4>
              ) : (
                items.map(item => (
                  <Movie
                    title={item.title}
                    key={item.id}
                    img={item.image}
                    isfavorite={this.state.favorites.includes(item.id)}
                    onClick={() => this.changeButton(item.id)}
                  >
                    {item.description}
                  </Movie>
                ))
              )}
            </div>
            <div className="Content-btn">
              <Button size="large">Get More Content</Button>
              );
            </div> */}

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
              {/* <li>
                  <a href="www.visa.com">
                    <img className="Card" alt="Visa card logo" src={card}></img>
                  </a>
                </li>
                <li>
                  <a href="www.visa.com">
                    <img className="Card" alt="Visa card logo" src={card}></img>
                  </a>
                </li>
                <li>
                  <a href="www.visa.com">
                    <img className="Card" alt="Visa card logo" src={card}></img>
                  </a>
                </li> */}
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
  // }
};

// function Home() {
//   return <h2>Home</h2>;
// }

// function Signin() {
//   return (
//     <div className="SignIn">
//       <div className="SignIn-box">
//         <label className="Label" for="userName">
//           Username
//         </label>
//         <input className="Input" type="text" id="fname" name="serName" />
//         <label className="Label" for="password">
//           Password
//         </label>
//         <input
//           className="Input Password"
//           type="password"
//           id="pasword"
//           name="password"
//         />
//         <Button size="large">Sign in</Button>
//       </div>
//     </div>
//   );
// }

// function Home() {
//   return <h2>Login</h2>;
// }
export default withRouter(App);
