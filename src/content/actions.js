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
