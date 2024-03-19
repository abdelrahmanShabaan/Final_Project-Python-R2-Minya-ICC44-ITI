import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import favoritesReducer from "./reducers/AddToFav";
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    filter: filterReducer,
    category: categoryReducer,
  },
});

export default store;
