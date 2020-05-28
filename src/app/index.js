import React, { Component } from "react";
import "./index.css";
import logo from "./styles/images/F.svg";
import card from "./styles/images/credit-card.svg";
import "./styles/scss/styles.scss";

import Button from "./components/Button";
import Movie from "./components/Movies";
// import { filter } from "minimatch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      favorites: [],
      isLoaded: false
    };
  }

  changeButton = id => {
    let { favorites } = this.state;
    console.log(id);
    if (favorites.includes(id)) {
      this.setState({ favorites: favorites.filter(el => el !== id) });
    } else {
      this.setState({ favorites: favorites.concat(id) });
    }
  };

  componentDidMount = async () => {
    try {
      fetch(`https://academy-video-api.herokuapp.com/content/free-items`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json,
            button: false
          });
        });
    } catch (e) {
      console.log(await e);
    }
  };

  // let displayMovies = document.
  //   drawItemsIn = (items, htmlElement) => {
  //     return new Promise(resolve => {
  //       htmlElement.innerHTML = "";
  //     })
  //   }

  render() {
    const { isLoaded, items } = this.state;
    // this.setState(follow => ({
    //   check: !follow.check
    // }));
    // const { button, setButton } = React.useState(false);

    // const onClick = e => {
    //   console.log("veikia");
    //   setButton(!button);
    // };

    return (
      <div className="App">
        <div className="Container">
          <header className="App-header">
            <a href="http://localhost:3000/">
              <img className="Logo" alt="felix logo" src={logo}></img>
            </a>
            <Button size="small">Sign in</Button>
          </header>
          <div className="Hero">
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
          );
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
  }
}
export default App;
