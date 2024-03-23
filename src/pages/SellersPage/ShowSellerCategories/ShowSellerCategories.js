import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./ShowSellerCategories.css";


function ShowSellerCategories() {

    
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
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Change this to adjust the number of categories per page
  const [categoryPerPage] = useState(5); // Change this to adjust the number of products per page
  const indexOfLastProduct = currentPage * categoryPerPage;
  const indexOfFirstProduct = indexOfLastProduct - categoryPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const currentcategories = categories.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );




useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/categories/"
        );
        setCategories(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchcategories();
  }, []);

 
  const handleEditClick = (id) => {
    Navigate(`/EditSellercategories/${id}`);
  };

  

  const deleteRev = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          // `https://api-generator.retool.com/u9XTxw/data/${id}`
          `http://127.0.0.1:8000/categories/${id}/`
        );
        loadData();
        console.log("Delete successful");
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };


  
const loadData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/categories/"
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };


  return (
    <>
      <div className="grid-containerwa">
        <SlideBarBuyer />

        <div className="product-list-container-buyer">
          <h1 className="buyerheader">Categories List</h1>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {currentcategories.map((categories) => (
                  <tr key={categories.id}>
                    <td>{categories}</td>
                    <td>
                    <button
                        className="primarys-btn"
                        onClick={() => handleEditClick(categories.id)}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        className="dangerssq-btn"
                        onClick={() => deleteRev(categories.id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
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


}export default ShowSellerCategories;