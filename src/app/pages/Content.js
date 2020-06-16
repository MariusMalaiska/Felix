import React, { useState, useEffect, useCallback } from "react";
import "../index.css";
import Movie from "../components/Movies";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import content from "../../content";

//({ favorites, setMovies, movies }) istraukia is props juose esancius itemus ->
const Content = ({ favorites, setMovies, movies }) => {
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
      let json = await res.json();
      setMovies(json);
    }
    setIsLoaded(true);
  }, [setIsLoaded, setMovies]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  console.log(movies, "content");

  return (
    <React.Fragment>
      <div className="Movies">
        {!isLoaded ? (
          <h4 style={{ color: "white" }}> loading...</h4>
        ) : (
          movies.map(item => (
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
    </React.Fragment>
  );
};

// mapDispatchToProps prokonectina movies prie esamo js failo->
function mapStateToProps(state) {
  return {
    movies: content.selectors.movies(state)
  };
}

// mapDispatchToProps perduoda setMovies i props->
function mapDispatchToProps(dispatch) {
  return {
    // vietoje be actions creator sukuria funkciaja setMovies ->
    // setMovies: movies => dispatch({ type: content.types.SET_MOVIES, movies })
    // bindActionCreators prisega prie actions ->
    setMovies: bindActionCreators(content.actions.setMovies, dispatch)
  };
}
// connect prikonectina viada 1 mapStateToProps ir antra mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(Content);
