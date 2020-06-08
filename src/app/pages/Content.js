import React, { useState, useEffect, useCallback } from "react";
import "../index.css";
import Movie from "../components/Movies";

// class Content extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       favorites: [],
//       isLoaded: false
//     };
//   }
const Content = ({ favorites, setFavorites }) => {
  const [items, setItems] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // changeButton = id => {
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
  const getItems = useCallback(async () => {
    setIsLoaded(false);
    const res = await fetch(
      `https://academy-video-api.herokuapp.com/content/items`,
      {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    );
    // .then(res => res.json())
    // .then(json => {
    // this.setState({
    ////-------------------
    //   console.log(res.json());
    // });
    //------------------------
    if (res.ok) {
      setItems(await res.json());
    }
    setIsLoaded(true);
  }, [setIsLoaded, setItems]);
  // ---------------
  // isLoaded: true,
  // items: json,
  // button: false
  // setIsLoaded(true), setItems(json);
  useEffect(() => {
    getItems();
  }, [getItems]);
  // });
  //     });
  // });

  // render() {
  // this.state;
  // const { isLoaded, items } = state;

  return (
    <React.Fragment>
      <div className="Movies">
        {!isLoaded ? (
          <h4 style={{ color: "white" }}> loading...</h4>
        ) : (
          items.map(item => (
            <Movie
              title={item.title}
              key={item.id}
              img={item.image}
              // isfavorite={this.state.favorites.includes(item.id)}
              isfavorite={favorites.includes(item.id)}
              // onClick={() => this.changeButton(item.id)}
              onClick={() => changeButton(item.id)}
            >
              {item.description}
            </Movie>
          ))
        )}
      </div>
    </React.Fragment>
  );
  // }
};

export default Content;
