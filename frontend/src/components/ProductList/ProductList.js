import React from "react";
import "./ProductList.css";
import Product from "../Product/Product";
import Slider from "react-slick"; // Import Slider component if you're using a slider library like slick-carousel

const ProductList = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Calculate discounted price for each product
  const productsWithDiscount = products.map((product) => ({
    ...product,
    discountedPrice:
      product.price - product.price * (product.discountPercentage / 100),
  }));

  return (
    <div>
      <Slider {...settings}>
        {productsWithDiscount.map((product) => (
          <div key={product.id}>
            <Product product={{ ...product }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
