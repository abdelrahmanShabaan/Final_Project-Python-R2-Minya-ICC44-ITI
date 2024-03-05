// import React from 'react';
// import './Popup.css';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import BtnsCo from "../reviews/Btns";
// import renderStars from "../stars/stars";

// function Popup({ isOpen, onClose }) {
//   const handleClose = () => {
//     onClose();
//   };
//   const [reviews, setReviews] = useState([]);
//   const [revs, setRevs] = useState("");
//   const [sessionLogin, setSessionLogin] = useState([]);
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editedReviewText, setEditedReviewText] = useState("");
//   const [rating, setRating] = useState(0); // Added state for rating

//   const onChangeH = (e) => {
//     setRevs(e.target.value);
//   };

//   const createRev = async () => {
//     try {
//       await axios.post("https://retoolapi.dev/4XjVdq/data", {
//         rate: rating,
//         fName: sessionLogin[0].fullname,
//         reviews: revs,
//         name: sessionLogin[0].name,
//       });

//       loadData();
//       console.log("Post successful");
//     } catch (error) {
//       console.error("Error posting review:", error);
//     }
//   };

//   const loadData = async () => {
//     try {
//       const res = await axios.get("https://retoolapi.dev/4XjVdq/data");
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   useEffect(() => {
//     let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
//     setSessionLogin(sessionLogin);
//     console.log(sessionLogin);
//   }, []);

//     // Function to handle rating change
//     const handleRatingChange = (value) => {
//       setRating(value);
//     };

//   const test = () => {
//     if (sessionLogin.length > 0) {
//       console.log(true);
//     } else {
//       console.log(false);
//     }
//   };
//   test();
//   useEffect(() => {
//     loadData();
//   }, [sessionLogin]);

//   const deleteRev = async (id) => {
//     try {
//       await axios.delete(`https://retoolapi.dev/4XjVdq/data/${id}`);

//       loadData();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };
//   const handleSaveAndClose = () => {
//     createRev();
//     handleClose();
//   };

//   const editRev = async (id) => {
//     try {
//       await axios.patch(`https://retoolapi.dev/4XjVdq/data/${id}`, {
//         reviews: editedReviewText,
//       });

//       loadData();
//       console.log("Edit successful");
//       setEditingReviewId(null);
//       setEditedReviewText("");
//     } catch (error) {
//       console.error("Error editing review:", error);
//     }
//   };
//   return (
//     <div className={`popup-container ${isOpen ? 'open' : ''}`}>
//       <div className="overlay" onClick={handleClose}></div>
//       <div className="popup">
//         <div className="popup-content">
//           <div className="popup-header">
//             <h2>Add your review</h2>
//             <button onClick={handleClose} className="close-button">
//               &times;
//             </button>
//           </div>
//           <div className="input-container">
//             {/* <label htmlFor="name">Your Name:</label>
//             <input type="text" id="name" placeholder="Enter your name" /> */}
//             {sessionLogin && sessionLogin.length > 0 && (
//               <p className="m-0">{sessionLogin[0].name}</p>
//             )}

//             <label htmlFor="comment">Your Comment:</label>
//             {/* <textarea id="comment" rows="4" placeholder="Enter your comment"></textarea> */}
//             <input
//               id="comment"
//               onChange={onChangeH}
//               value={revs}
//               type="text"
//               className="form-control"
//               placeholder="Please Add Review"
//             />

//             {/* <div className="rating">
//               <p>Your review</p>
//               <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
//               <p>Your rating is:</p>
//             </div> */}

//             <div className="rating">
//               <p>Your review</p>
//               {/* Render stars based on rating */}
//               {renderStars(rating, handleRatingChange)}
//               <p>Your rating is: {rating}</p>
//             </div>

//             <button onClick={handleSaveAndClose} className="add-review-btn">
//               Save
//             </button>

//             {/* <button onClick={handleClose} className="close-button">
//               Close
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Popup;

// ----------------------------------------
// import React, { useState } from 'react';
// import './Popup.css';
// import { useEffect } from "react";
// import axios from "axios";
// import BtnsCo from "../reviews/Btns";

// function Popup({ isOpen, onClose }) {
//   const handleClose = () => {
//     onClose();
//   };

//   const [reviews, setReviews] = useState([]);
//   const [revs, setRevs] = useState("");
//   const [sessionLogin, setSessionLogin] = useState([]);
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editedReviewText, setEditedReviewText] = useState("");
//   const [rating, setRating] = useState(0); // State to hold the selected rating

//   const onChangeH = (e) => {
//     setRevs(e.target.value);
//   };

//   const createRev = async () => {
//     try {
//       await axios.post("https://retoolapi.dev/4XjVdq/data", {
//         rate: rating,
//         fName: sessionLogin[0].fullname,
//         reviews: revs,
//         name: sessionLogin[0].name,
//       });

//       handleClose(); // Close the popup after creating the review
//       loadData();
//       console.log("Post successful");
//     } catch (error) {
//       console.error("Error posting review:", error);
//     }
//   };

//   const loadData = async () => {
//     try {
//       const res = await axios.get("https://retoolapi.dev/4XjVdq/data");
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   useEffect(() => {
//     let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
//     setSessionLogin(sessionLogin);
//     console.log(sessionLogin);
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [sessionLogin]);

//   const deleteRev = async (id) => {
//     try {
//       await axios.delete(`https://retoolapi.dev/4XjVdq/data/${id}`);

//       loadData();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const editRev = async (id) => {
//     try {
//       await axios.patch(`https://retoolapi.dev/4XjVdq/data/${id}`, {
//         reviews: editedReviewText,
//       });

//       loadData();
//       console.log("Edit successful");
//       setEditingReviewId(null);
//       setEditedReviewText("");
//     } catch (error) {
//       console.error("Error editing review:", error);
//     }
//   };

//   // Function to handle rating selection
//   const handleRating = (value) => {
//     setRating(value);
//   };

//   // Function to render stars based on rating
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={i <= rating ? 'selected' : ''}
//           onClick={() => handleRating(i)}
//         >
//           &#9733;
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className={`popup-container ${isOpen ? 'open' : ''}`}>
//       <div className="overlay" onClick={handleClose}></div>
//       <div className="popup">
//         <div className="popup-content">
//           <div className="popup-header">
//             <h2>Add your review</h2>
//             <button onClick={handleClose} className="close-button">
//               &times;
//             </button>
//           </div>
//           <div className="input-container">
//             {sessionLogin && sessionLogin.length > 0 && (
//               <p className="m-0">{sessionLogin[0].name}</p>
//             )}

//             <label htmlFor="comment">Your Comment:</label>
//             <input
//               id="comment"
//               onChange={onChangeH}
//               value={revs}
//               type="text"
//               className="form-control"
//               placeholder="Please Add Review"
//             />

//             <div className="rating">
//               <p>Your review</p>
//               <div className="stars-container">{renderStars()}</div>
//               <p>Your rating is: {rating}</p>
//             </div>

//             <button onClick={createRev} className="add-review-btn">
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Popup;

// -------------------------- Working -------------------------------------------------------------

// import React, { useState } from 'react';
// import './Popup.css';
// import { useEffect } from "react";
// import axios from "axios";
// import BtnsCo from "../reviews/Btns";

// function Popup({ isOpen, onClose }) {
//   const handleClose = () => {
//     onClose();
//   };

//   const [reviews, setReviews] = useState([]);
//   const [revs, setRevs] = useState("");
//   const [sessionLogin, setSessionLogin] = useState([]);
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editedReviewText, setEditedReviewText] = useState("");
//   const [rating, setRating] = useState(0);

//   const onChangeH = (e) => {
//     setRevs(e.target.value);
//   };

//   const createRev = async () => {
//     try {
//       await axios.post("https://retoolapi.dev/4XjVdq/data", {
//         rate: rating,
//         fName: sessionLogin[0].fullname,
//         reviews: revs,
//         name: sessionLogin[0].name,
//       });

//       handleClose();
//       loadData();
//       console.log("Post successful");
//     } catch (error) {
//       console.error("Error posting review:", error);
//     }
//   };

//   const loadData = async () => {
//     try {
//       const res = await axios.get("https://retoolapi.dev/4XjVdq/data");
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   useEffect(() => {
//     let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
//     setSessionLogin(sessionLogin);
//     console.log(sessionLogin);
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [sessionLogin]);

//   const deleteRev = async (id) => {
//     try {
//       await axios.delete(`https://retoolapi.dev/4XjVdq/data/${id}`);

//       loadData();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const editRev = async (id) => {
//     try {
//       await axios.patch(`https://retoolapi.dev/4XjVdq/data/${id}`, {
//         reviews: editedReviewText,
//       });

//       loadData();
//       console.log("Edit successful");
//       setEditingReviewId(null);
//       setEditedReviewText("");
//     } catch (error) {
//       console.error("Error editing review:", error);
//     }
//   };

//   // Function to handle rating selection
//   const handleRating = (value) => {
//     setRating(value);
//   };

//   // Function to render stars based on rating
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={`star ${i <= rating ? 'filled' : ''}`}
//           onClick={() => handleRating(i)}
//         >
//           &#9733;
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className={`popup-container ${isOpen ? 'open' : ''}`}>
//       <div className="overlay" onClick={handleClose}></div>
//       <div className="popup">
//         <div className="popup-content">
//           <div className="popup-header">
//             <h2>Add your review</h2>
//             <button onClick={handleClose} className="close-button">
//               &times;
//             </button>
//           </div>
//           <div className="input-container">
//             {sessionLogin && sessionLogin.length > 0 && (
//               <p className="m-0">{sessionLogin[0].name}</p>
//             )}

//             <label htmlFor="comment">Your Comment:</label>
//             <input
//               id="comment"
//               onChange={onChangeH}
//               value={revs}
//               type="text"
//               className="form-control"
//               placeholder="Please Add Review"
//             />

//             <div className="rating">
//               <p>Your review</p>
//               <div className="stars-container">{renderStars()}</div>
//               <p>Your rating is: {rating}</p>
//             </div>

//             <button onClick={createRev} className="add-review-btn">
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Popup;

// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

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
      await axios.post("https://retoolapi.dev/4XjVdq/data", {
        rate: rating,
        fName: sessionLogin[0].fullname,
        reviews: revs,
        name: sessionLogin[0].name,
      });

      loadData();
      handleClose();
      console.log("Post successful");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get("https://retoolapi.dev/4XjVdq/data");
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
            <h2>Add your review</h2>
            <button onClick={handleClose} className="close-button">
              &times;
            </button>
          </div>
          <div className="input-container">
            {sessionLogin && sessionLogin.length > 0 && (
              <p className="m-0">{sessionLogin[0].name}</p>
            )}

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
