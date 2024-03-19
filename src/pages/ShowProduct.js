import React, { useEffect, useState } from "react";
import axios from "axios";
import "./productStyle.css";

function ShowProduct() {
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/5`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="containerw">
        <h1 className="text-center text-dark">Product Details</h1>
        <div className="cards container">
          {Object.keys(products).length > 0 ? (
            <>
              <img src={products.thumbnail} alt={products.title} />
              <div className="cards-body">
                <h5 className="cards-title">{products.title}</h5>
                <h5 className="cards-title">{products.description}</h5>
                <p className="cards-title">Price: ${products.price}</p>
                <p className="cards-title">
                  Discount Percentage: {products.discountPercentage} %
                </p>
                <p className="cards-title">Brand: {products.brand}</p>
                <p className="cards-title">Category: {products.category}</p>
                <div className="thumbnail-container">
                  {products.images &&
                    products.images.length > 0 &&
                    products.images.map((imgObj, index) => (
                      <img
                        key={index}
                        src={imgObj.image} // Corrected this part
                        alt={`${products.title} Thumbnail ${index + 1}`}
                        className="img-cover img-fluid"
                      />
                    ))}
                </div>
              </div>
            </>
          ) : (
            <p>isloading</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowProduct;
