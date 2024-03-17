export const addToFavorites = (id) => ({
  type: "ADD_TO_FAVORITES",
  payload: id,
});

export const removeFromFavorites = (id) => ({
  type: "REMOVE_FROM_FAVORITES",
  payload: id,
});

export const getFavorites = (state) => state.favorites;
export const getFavoritesCount = (state) => state.favorites.favoritesCount;