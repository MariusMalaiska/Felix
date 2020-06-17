import * as types from "./types";

export const toggleFavorite = (id, isFavorite) => {
  if (typeof isFavorite === "boolean") {
    return {
      type: isFavorite ? types.TOGGLE_FAVORITE : types.TOGGLE_FAVORITE,

      id
    };
  }

  return { type: types.TOGGLE_FAVORITE, id };
};

export const setToken = token => {
  return {
    type: types.SET_TOKEN,
    token
  };
};

export const setMovies = movies => {
  return {
    type: types.SET_MOVIES,
    movies
  };
};

// fetch action creator using redux-thunk middleware
export const fetchMovies = ({ free } = {}, token) => {
  return async dispatch => {
    dispatch({ type: types.MOVIES_REQ });

    const response = await fetch(
      `https://academy-video-api.herokuapp.com/content/${
        free ? "free-" : ""
      }items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        }
      }
    );
    if (!response.ok) {
      dispatch({
        type: types.MOVIES_FAILURE,
        payload: await response.json(),
        error: "Oops, only free content"
      });
    } else {
      dispatch({ type: types.MOVIES_SUCESS, payload: await response.json() });
    }
  };
};
