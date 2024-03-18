import React, { useState, useEffect } from "react";
import "./Popup.css";
import axios from "axios";

function Popup({ isOpen, onClose, reviewToEdit }) {
  const [revs, setRevs] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (reviewToEdit) {
      setRevs(reviewToEdit.reviews);
      setRating(reviewToEdit.rate);
    } else {
      setRevs("");
      setRating(0);
    }
  }, [reviewToEdit]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
      try {
        await axios.patch(
          `http://127.0.0.1:8000/review/${reviewToEdit.id}/`,
          {
            reviews: revs,
            rate: rating,
          }
        );
        console.log("Edit successful");
        handleClose();
      } catch (error) {
        console.error("Error editing review:", error);
      }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onMouseOver={() => handleRating(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`popup-container ${isOpen ? "open" : ""}`}>
      <div className="overlay" onClick={handleClose}></div>
      <div className="popup">
        <div className="popup-content">
          <div className="popup-header">
            <h2>{reviewToEdit ? "Edit your review" : "Add your review"}</h2>
            <button onClick={handleClose} className="close-button">
              &times;
            </button>
          </div>
          <div className="input-container">
            <label htmlFor="comment">Your Review:</label>
            <textarea
              id="comment"
              onChange={(e) => setRevs(e.target.value)}
              value={revs}
              type="text"
              className="form-control"
              placeholder="Please, add your review here"
            />

            <div className="rating">
              <p>Your rating is: {rating}</p>
              <div className="stars-container">{renderStars()}</div>
            </div>
            <button onClick={handleSave} className="add-review-btn">
              {reviewToEdit ? "Save" : "Add Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
