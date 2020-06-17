export const allFavorites = state => state.content.favorites;
export const movies = state => state.content.movies.data;
export const isFavoriteById = (state, id) =>
  state.content.favorites.includes(id);

export const isMoviesLoading = state => state.content.movies.loading;
