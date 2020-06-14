export const allFavorites = state => state.content.favorites;
export const isFavoriteById = (state, id) =>
  state.content.favorites.includes(id);
