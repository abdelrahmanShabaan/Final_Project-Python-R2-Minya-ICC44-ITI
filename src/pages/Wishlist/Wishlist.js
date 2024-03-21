import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFavorites } from "../../store/actions/ToggleFav";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import "./Wishlist.css";

const WishlistPage = () => {
  const favorites = useSelector(getFavorites);
  /** Redirection */
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "seller") {
        navigate("/Dashboard");
      }
    } else {
      navigate("/user");
    }
  }, []);

  return (
    <main>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3 style={{ color: "white" }}>Wishlist</h3>
              </div>
              {favorites.length > 0 ? (
                <div className="product-list">
                  {favorites.map((product) => (
                    <Product
                      className="product-item"
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <p>Your wishlist is empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
