import React, { useState, useEffect, useCallback } from "react";
import "../index.css";
import Movie from "../components/Movies";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import content from "../../content";
import auth from "../../auth";

//({ favorites, setMovies, movies }) istraukia is props juose esancius itemus ->
const Content = ({ favorites, setMovies, movies, token }) => {
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
          authorization: token
        }
      }
    );
    if (res.ok) {
      let json = await res.json();
      setMovies(json);
    }
    setIsLoaded(true);
  }, [setIsLoaded, setMovies, token]);

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
// function mapStateToProps(state) {
//   return {
//     movies: content.selectors.movies(state)
//   };
// }

// mapDispatchToProps perduoda setMovies i props->
// function mapDispatchToProps(dispatch) {
//   return {
// vietoje be actions creator sukuria funkciaja setMovies ->
// setMovies: movies => dispatch({ type: content.types.SET_MOVIES, movies })
// bindActionCreators prisega prie actions ->
// setMovies: bindActionCreators(content.actions.setMovies, dispatch)
//   };
// }
// connect prikonectina viada 1 mapStateToProps ir antra mapDispatchToProps
// export default connect(mapStateToProps, mapDispatchToProps)(Content);
// const enhance = connect(state => {
//   return {
//     isAuthenticated: !!auth.selectors.getAccessToken(state)
//   };
// });

// export default enhance(PrivateRoute);
const enhance = compose(
  connect(
    state => {
      return {
        token: auth.selectors.getAccessToken(state),
        movies: content.selectors.movies(state)
      };
    },
    dispatch => {
      return {
        setMovies: bindActionCreators(content.actions.setMovies, dispatch)
      };
    }
  )
);

export default enhance(Content);
