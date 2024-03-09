const initialState = {
  favorites: [],
  favoritesCount: 0,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        favoritesCount: state.favoritesCount + 1,
      };

    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((product) => product.id !== action.payload),
        favoritesCount: state.favoritesCount - 1,
      };

    default:
      return state;
  }
};

export default favoritesReducer;
