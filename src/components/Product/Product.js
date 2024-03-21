import { React, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/actions/ToggleFav";
import "./Product.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isMovieInFavorites = () => {
    return favorites.some((favMovie) => favMovie.id === product?.id);
  };

  const handleToggleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMovieInFavorites()) {
      dispatch(removeFromFavorites(product?.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  function renderStars(rating) {
    const maxStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;

    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= roundedRating) {
        stars.push(<span key={i}>&#9733;</span>); // Unicode star character
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Unicode empty star character
      }
    }

    return stars;
  }

  return (
    <Link to={`/product/${product?.id}`} key={product?.id}>
      <div className="product-item bg-white">
        <div className="category">{product?.category}</div>
        {/* <button
          className="badge"
          onClick={handleToggleFavorites}
        >
          {isMovieInFavorites() ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/754px-Star_full.svg.png"
              alt="Filled Star"
              height={24}
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
              alt="Empty Star"
              height={24}
            />
          )}
        </button> */}
        <button
          className="badge"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleToggleFavorites}
        >
          {isMovieInFavorites() ? (
            <img
              src={
                isHovered
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/754px-Star_full.svg.png"
              }
              alt="Filled Star"
              height={24}
            />
          ) : (
            <img
              src={
                isHovered
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/754px-Star_full.svg.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
              }
              alt="Empty Star"
              height={24}
            />
          )}
        </button>

        <div className="product-item-img img-fluid">
          <img
            className="img-cover img-fluid"
            // src={product?.images[0]?.image}
            src={product?.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-item-info fs-14">
          <div className="brand" style={{ height: "40px", fontWeight: "bold" }}>
            {/* <span>Brand: </span> */}
            <span className="fw-8">{product?.brand}</span>
          </div>

          <div className="titlex py-2" style={{ height: "55px" }}>
            {product?.title}
          </div>

          <div
            className="your-store-rating"
            style={{ justifyContent: "center" }}
          >
            <span
              className="text-orange fw-5"
              style={{ color: "black" }}
            ></span>
            {renderStars(product?.rating)}
          </div>

          <div
            className="price flex align-center justify-center"
            style={{ height: "55px" }}
          >
            <span className="old-price">{formatPrice(product?.price)}</span>
            <span className="new-price">
              {formatPrice(product?.discountedPrice)}
            </span>
            <span className="discount fw-6">
              ({product?.discountPercentage}%)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
