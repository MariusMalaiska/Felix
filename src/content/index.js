const DEFAULT_CONTET_STATE = {
  favorites: [],
  token: localStorage.getItem("token"),
  movies: []
};

function contentReducer(state = DEFAULT_CONTET_STATE, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      if (!state.favorites.includes(action.id)) {
        return { ...state, favorites: [...state.favorites, action.id] };
      } else {
        return {
          ...state,
          favorites: state.favorites.filter(id => id !== action.id)
        };
      }
    }
    case "SET_TOKEN": {
      console.log(action);
      return { ...state, token: action.token };
    }
    case "SET_MOVIES": {
      console.log(action);
      return { ...state, movies: action.movies };
    }
    default:
      return state;
  }
}

export default contentReducer;
