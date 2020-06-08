import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/Button";
import "../index.css";
import Movie from "../components/Movies";

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       favorites: [],
//       isLoaded: false
//     };
//   }
const Home = ({ favorites, setFavorites }) => {
  const [items, setItems] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // changeButton = id => {
  //   let { favorites } = this.state;
  //   console.log(id);
  //   if (favorites.includes(id)) {
  //     this.setState({ favorites: favorites.filter(el => el !== id) });
  //   } else {
  //     this.setState({ favorites: favorites.concat(id) });
  //   }
  // };
  const changeButton = useCallback(
    id => {
      // let { favorites } = this.state;
      console.log(id);
      if (favorites.includes(id)) {
        // this.setState({ favorites: favorites.filter(el => el !== id) });
        setFavorites(favorites.filter(el => el !== id));
      } else {
        // this.setState({ favorites: favorites.concat(id) });
        setFavorites(favorites.concat(id));
      }
    },
    [favorites, setFavorites]
  );

  // componentDidMount = async () => {
  const freeItems = useCallback(
    async e => {
      const res = await fetch(
        `https://academy-video-api.herokuapp.com/content/free-items`,
        {
          method: "GET"
        }
      );
      // .then(res => res.json())
      // .then(json => {
      //   this.setState({
      //     isLoaded: true,
      //     items: json,
      //     button: false
      //   });
      // });
      if (res.ok) {
        setItems(await res.json());
      }
      setIsLoaded(true);
    },
    [setIsLoaded, setItems]
  );

  useEffect(() => {
    freeItems();
  }, [freeItems]);

  // render() {
  // const { isLoaded, items } = this.state;
  return (
    <React.Fragment>
      <div className="Hero">
        <h1>Wanna more Content ?</h1>
        <div>
          <Button size="large">Get Access</Button>
        </div>
      </div>
      <div className="Gray-line" />
      <div className="Movies">
        {!isLoaded ? (
          <h4 style={{ color: "white" }}> loading...</h4>
        ) : (
          items.map(item => (
            <Movie
              title={item.title}
              key={item.id}
              img={item.image}
              isfavorite={favorites.includes(item.id)}
              onClick={() => changeButton(item.id)}
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
};
// }

export default Home;
