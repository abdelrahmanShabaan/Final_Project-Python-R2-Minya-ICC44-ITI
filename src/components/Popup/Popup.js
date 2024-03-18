import React, { useState, useEffect } from "react";
import "./Popup.css";
import axios from "axios";

function Popup({ isOpen, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const [reviews, setReviews] = useState([]);
  const [revs, setRevs] = useState("");
  const [sessionLogin, setSessionLogin] = useState([]);
  const [rating, setRating] = useState(0);

  const onChangeH = (e) => {
    setRevs(e.target.value);
  };

  const createRev = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/review/", {
        rate: rating,
        reviews: revs,
        name: sessionLogin.name,
      });
      console.log(sessionLogin)
      loadData();
      handleClose();
      console.log("Post successful");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/review/");
      setReviews(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
    setSessionLogin(sessionLogin);
    console.log(sessionLogin);
    loadData();
  }, []);

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
            <h2>Add your review</h2>
            <button onClick={handleClose} className="close-button">
              &times;
            </button>
          </div>
          <div className="input-container">
              <p className="m-0">{sessionLogin.name}</p>

            <label htmlFor="comment">Your Review:</label>
            <textarea
              id="comment"
              onChange={onChangeH}
              value={revs}
              type="text"
              className="form-control"
              placeholder="Please, add your review here"
            />

            <div className="rating">
              <p>Your rating is: {rating}</p>
              <div className="stars-container">{renderStars()}</div>
            </div>
            <button onClick={createRev} className="add-review-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
