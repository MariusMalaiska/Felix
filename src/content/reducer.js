import * as types from "./types";

const DEFAULT_CONTET_STATE = {
  favorites: [],
  token: localStorage.getItem("token"),
  movies: { loading: false, data: [], error: null }
};

function contentReducer(state = DEFAULT_CONTET_STATE, action) {
  switch (action.type) {
    case types.TOGGLE_FAVORITE: {
      if (!state.favorites.includes(action.id)) {
        return { ...state, favorites: [...state.favorites, action.id] };
      } else {
        return {
          ...state,
          favorites: state.favorites.filter(id => id !== action.id)
        };
      }
    }
    case types.SET_TOKEN: {
      console.log(action);
      return { ...state, token: action.token };
    }
    case types.SET_MOVIES: {
      console.log(action, "stringas");
      return { ...state, movies: action.movies };
    }
    // -----------------------------
    case types.MOVIES_REQ:
      return { ...state, movies: { ...state.movies, loading: true } };
    case types.MOVIES_FAILURE:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: false,
          data: action.payload,
          error: action.error
        }
      };
    case types.MOVIES_SUCESS:
      return {
        ...state,
        movies: { ...state.movies, loading: false, data: action.payload }
      };

    default:
      return state;
  }
}

export default contentReducer;
