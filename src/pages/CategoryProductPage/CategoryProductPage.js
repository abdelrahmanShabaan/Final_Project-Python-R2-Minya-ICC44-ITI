import React, { useEffect } from "react";
import "./CategoryProductPage.css";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProductsByCategory,
  fetchAsyncProductsOfCategory,
  getCategoryProductsStatus,
} from "../../store/categorySlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    console.log(`Fetching products for category: ${category}`); // Debugging line
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  if (categoryProductsStatus === STATUS.LOADING) {
    return <Loader />;
  }

  console.log(`Category Products:`, categoryProducts); // Debugging line

  return (
    <div className="cat-products py-5 bg-whitesmoke">
      <div className="container">
        <div className="cat-products-content">
          <div className="title-md">
            <h3>
              See our{" "}
              <span className="text-capitalize">
                {category.replace("-", " ")}
              </span>
            </h3>
          </div>
          <ProductList products={categoryProducts} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
