export const allFavorites = state => state.content.favorites;
export const movies = state => state.content.movies;
export const isFavoriteById = (state, id) =>
  state.content.favorites.includes(id);
