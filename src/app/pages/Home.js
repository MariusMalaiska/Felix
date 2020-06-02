import React from "react";
import Button from "../components/Button";
import "../index.css";
import Movie from "../components/Movies";

class Home extends React.Component {
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

  render() {
    const { isLoaded, items } = this.state;
    return (
      <React.Fragment>
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
        <div className="Content-btn">
          <Button size="large">Get More Content</Button>
          );
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
