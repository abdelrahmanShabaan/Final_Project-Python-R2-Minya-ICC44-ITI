import React, { useState, useEffect } from "react";
import "./Popup.css";
import axios from "axios";

function Popup({ isOpen, onClose, reviewToEdit }) {
  const [revs, setRevs] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [sessionLogin, setSessionLogin] = useState([]);

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
    if (reviewToEdit) {
      // Editing existing review
      try {
        await axios.patch(
          `https://retoolapi.dev/4XjVdq/data/${reviewToEdit.id}`,
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
    } else {
      // Creating new review
      try {
        await axios.post("https://retoolapi.dev/4XjVdq/data", {
          rate: rating,
          reviews: revs,
          // Assuming sessionLogin is available
          fName: sessionLogin[0].fullname,
          name: sessionLogin[0].name,
        });
        console.log("Post successful");
        handleClose();
      } catch (error) {
        console.error("Error posting review:", error);
      }
    }
  };

  // Function to handle rating selection
  const handleRating = (value) => {
    setRating(value);
  };

  // Function to render stars based on rating
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