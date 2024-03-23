import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./ShowSellerReviews.css";


function ShowSellerReviews() {

    
  /** Redirection */
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      redirectBasedOnRole(user.role);
    } else {
      navigate("/user");
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    if (role === "customer") {
      navigate("/");
    }
  };
  /** End of Redirection */



  // save categories in useState
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5); // Change this to adjust the number of categories per page
  const [reviewPerPage] = useState(5); // Change this to adjust the number of products per page
  const indexOfLastProduct = currentPage * reviewPerPage;
  const indexOfFirstProduct = indexOfLastProduct - reviewPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );




useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/review/"
        );
        setReviews(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchcategories();
  }, []);

 
//   const handleEditClick = (id) => {
//     Navigate(`http://127.0.0.1:8000/review/${id}`);
//   };

  

//   const deleteRev = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this product?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(
//           // `https://api-generator.retool.com/u9XTxw/data/${id}`
//           `http://127.0.0.1:8000/review/${id}/`
//         );
//         loadData();
//         console.log("Delete successful");
//       } catch (error) {
//         console.error("Error deleting review:", error);
//       }
//     }
//   };


  
// const loadData = async () => {
//     try {
//       const res = await axios.get(
//         "http://127.0.0.1:8000/categories/"
//       );
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };


// Function to generate star icons based on rating
const generateStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0; // Check for half star
    const emptyStars = 5 - fullStars - halfStar; // Number of empty stars
  
    let stars = '';
  
    // Generate full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
  
    // Generate half star if needed
    if (halfStar === 1) {
      stars += '½';
    }
  
    // Generate empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
  
    return stars;
  };

  return (
    <>
      <div className="grid-containerwa">
        <SlideBarBuyer />

        <div className="product-list-container-buyer">
          <h1 className="buyerheader">Reviews List</h1>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Client name</th>
                  <th>Rate</th>
                  <th>Review</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((reviews) => (
                  <tr key={reviews.id}>
                    <td>{reviews.name}</td>
                    <td><span style={{ color: "yellow" }}>{generateStars(reviews.rate)}</span> </td>
                    <td>{reviews.reviews}</td>
                    <td>Product Name</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           {/* Pagination */}
           <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              {"<"}
            </button>
            {[...Array(totalPages > 3 ? 3 : totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : "inactive"}
                onClick={() => paginate(index + 1)}
              >
                {currentPage > 2 ? index + currentPage - 2 : index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );


}export default ShowSellerReviews;