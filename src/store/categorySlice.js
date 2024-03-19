import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import axios from "axios";

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state, action) => {
        state.categoriesStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncCategories.rejected, (state, action) => {
        state.categoriesStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncProductsOfCategory.pending, (state, action) => {
        state.categoryProductsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.categoryProductsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProductsOfCategory.rejected, (state, action) => {
        state.categoryProductsStatus = STATUS.FAILED;
      });
  },
});

// Async thunk for fetching categories
export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`); // Ensure the endpoint is correct
      return response.data; // With Axios, you directly use response.data
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
);

// Async thunk for fetching products of a specific category
export const fetchAsyncProductsOfCategory = createAsyncThunk(
  "category-products/fetch",
  async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}category/${category}/`); // Adjust the endpoint as needed
      console.log("Fetched products of category:", response.data); // Log to see what data is returned
      return response.data.products; // Adjust if the API response structure is different
    } catch (error) {
      console.error("Error fetching category products:", error);
      throw error;
    }
  }
);
export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) =>
  state.category.categoryProducts;
export const getCategoryProductsStatus = (state) =>
  state.category.categoryProductsStatus;
export default categorySlice.reducer;
