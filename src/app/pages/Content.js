import React, { useState, useEffect, useCallback } from "react";
import "../index.css";
import Movie from "../components/Movies";
import { connect } from "react-redux";
import content from "../../content";

const Content = ({ favorites, setMovies }) => {
  // const [item, setItem] = useState([]);
  // const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

    if (res.ok) {
      // setItems(await res.json());
      let json = await res.json();
      // console.log(props);
      setMovies(json);
      // console.log(movies + "some");
      // console.log(props.movies);
      // setItems(props.movies);
    }
    setIsLoaded(true);
    // }, [setIsLoaded, setItems, props]);
  }, [setIsLoaded, setMovies]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <React.Fragment>
      <div className="Movies">
        {/* {!isLoaded ? (
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
        )} */}
      </div>
    </React.Fragment>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setMovies: movies => dispatch({ type: content.types.SET_MOVIES, movies })
  };
}

export default connect(null, mapDispatchToProps)(Content);
