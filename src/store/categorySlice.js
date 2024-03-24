import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(
        error.response?.data || "Error fetching categories"
      );
    }
  }
);

export const fetchAsyncProductsOfCategory = createAsyncThunk(
  "category-products/fetch",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}products/?category=${encodeURIComponent(category)}`
      );
      console.log("Fetched products of category:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching category products:", error);
      return rejectWithValue(
        error.response?.data || "Error fetching category products"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state) => {
        state.categoriesStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncCategories.rejected, (state) => {
        state.categoriesStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncProductsOfCategory.pending, (state) => {
        state.categoryProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.categoryProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProductsOfCategory.rejected, (state) => {
        state.categoryProductsStatus = STATUS.FAILED;
      });
  },
});

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) =>
  state.category.categoryProducts;
export const getCategoryProductsStatus = (state) =>
  state.category.categoryProductsStatus;

export default categorySlice.reducer;
