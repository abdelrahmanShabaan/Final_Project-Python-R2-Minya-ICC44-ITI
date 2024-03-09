import "./reviews.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import Popup from "../../components/Popup/PopupEdit";

export default function Rev(props) {
  const [reviews, setReviews] = useState([]);
  const [sessionLogin, setSessionLogin] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(3);
  const [showPopup, setShowPopup] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const loadData = async () => {
    try {
      const res = await axios.get("https://retoolapi.dev/4XjVdq/data");
      setReviews(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
    setSessionLogin(sessionLogin);
    console.log(sessionLogin);
  }, []);

  function renderStars(rating) {
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

    return stars;
  }

  const deleteRev = async (id) => {
    try {
      await axios.delete(`https://retoolapi.dev/4XjVdq/data/${id}`);

      loadData();
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const editRev = async (id) => {
    try {
      await axios.patch(`https://retoolapi.dev/4XjVdq/data/${id}`, {
        reviews: editedReviewText,
      });

      loadData();
      console.log("Edit successful");
      setEditingReviewId(null);
      setEditedReviewText("");
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEdit = (review) => {
    setReviewToEdit(review);
    setShowPopup(true);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rev-card-container">
      <div className="your-store-title fs-20 fw-5">
        Product Ratings & Reviews
      </div>
      {currentReviews.map((rev) => (
        <div className="rev-item" key={rev.id}>
          <div className="d-flex gap-1">
            <div className="reviews">
              <p className="m-0 your-store-rating">
                {rev.name} {renderStars(rev.rate)}
              </p>
              {editingReviewId === rev.id ? (
                <input
                  value={editedReviewText}
                  onChange={(e) => setEditedReviewText(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Edit Review"
                />
              ) : (
                <div className="rev-text-container">{rev.reviews}</div>
              )}
            </div>
          </div>
          {sessionStorage.getItem("login") !== null &&
            sessionLogin.name === rev.name && (
              <div className="rev-btns-container">
                <button
                  onClick={() => deleteRev(rev.id)}
                  className="delete-review-btn"
                >
                  Delete
                </button>
              </div>
            )}
          {sessionStorage.getItem("login") !== null &&
            sessionLogin.name === rev.name && (
              <>
                {editingReviewId === rev.id ? (
                  <button
                    onClick={() => editRev(rev.id)}
                    className="edit-save-btn"
                  >
                    Save
                  </button>
                ) : (
                  <div className="rev-btns-container">
                    <button
                      onClick={() => handleEdit(rev)}
                      className="edit-review-btn"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      ))}
      <Pagination
        totalPages={Math.ceil(reviews.length / reviewsPerPage)}
        currentPage={currentPage}
        handlePageNumClick={paginate}
      />
      {showPopup && (
        <Popup
          isOpen={showPopup}
          onClose={handleClosePopup}
          reviewToEdit={reviewToEdit}
        />
      )}
    </div>
  );
}
