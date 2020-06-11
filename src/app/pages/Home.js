import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/Button";
import "../index.css";
import Movie from "../components/Movies";

const Home = ({ favorites, setFavorites }) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // const changeButton = useCallback(
  //   id => {
  //     console.log(id);
  //     if (favorites.includes(id)) {
  //       setFavorites(favorites.filter(el => el !== id));
  //     } else {
  //       setFavorites(favorites.concat(id));
  //     }
  //   },
  //   [favorites, setFavorites]
  // );

  const freeItems = useCallback(
    async e => {
      const res = await fetch(
        `https://academy-video-api.herokuapp.com/content/free-items`,
        {
          method: "GET"
        }
      );

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
              id={item.id}
              isfavorite={favorites.includes(item.id)}
              // onClick={() => changeButton(item.id)}
              openMovie={item.id}
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

export default Home;
