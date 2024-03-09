import React from "react";

const renderStars = ({ rating }) => {
  const maxStars = 5;
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= roundedRating) {
      stars.push(<span key={i}>&#9733;</span>);
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }

  return (
    <div className="your-store-rating" style={{ justifyContent: "center" }}>
      <span className="text-orange fw-5" style={{ color: "black" }}></span>
      {stars}
    </div>
  );
};

export default renderStars;
