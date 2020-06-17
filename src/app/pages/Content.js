import React, { useEffect } from "react";
import "../index.css";
import Movie from "../components/Movies";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import content from "../../content";
import auth from "../../auth";

//({ favorites, setMovies, movies }) istraukia is props juose esancius itemus ->
const Content = ({ favorites, fetchMovies, movies, isLoading, token }) => {
  useEffect(() => {
    fetchMovies({}, token);
  }, [fetchMovies, token]);

  return (
    <React.Fragment>
      <div className="Movies">
        {isLoading ? (
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

const enhance = compose(
  connect(
    state => {
      return {
        token: auth.selectors.getAccessToken(state),
        movies: content.selectors.movies(state),
        isLoading: content.selectors.isMoviesLoading(state)
      };
    },
    dispatch => {
      return {
        fetchMovies: bindActionCreators(content.actions.fetchMovies, dispatch)
      };
    }
  )
);

export default enhance(Content);
