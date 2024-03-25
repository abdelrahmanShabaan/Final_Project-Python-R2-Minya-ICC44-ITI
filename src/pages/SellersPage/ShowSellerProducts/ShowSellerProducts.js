import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./ShowSellerProducts.css";

function ShowSellerProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Change this to adjust the number of products per page

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



/** ------------------------------------ start handel my seller data (abdelrahman shaaban) ------------------------ */

  const [formData, setFormData] = useState({
    id: null, // Initialize ID to null
    // other form data fields
  });

  useEffect(() => {
    const fetchProducts = async (id) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/sellers/${id}/`);
        console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (localStorage.getItem("login") !== null) {
      const seller = JSON.parse(localStorage.getItem("login"));
      // Extract ID from the seller object
      const { id } = seller;
      // Update the form data with the ID
      setFormData((prevData) => ({
        ...prevData,
        id: id,
      }));
      // Fetch products using the extracted ID
      fetchProducts(id);
    }
  }, []);

  /** ------------------------------------ end handel my seller data (abdelrahman shaaban) ------------------------ */


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

// /**===========================================Edit ================================ */

const handleEditClick = (id) => {
  navigate(`/EditSellerProducts/${id}/`);
};

// /**===========================================Finish Edit ================================ */

  
/**-------------------------------------------- New Get to edit and delete ------------------------ */

const [producttow, setProductsTwo] = useState([]);

useEffect(() => {
  const fetchProductsTwo = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/products/"
      );
      setProductsTwo(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching All products:", error);
    }
  };

  fetchProductsTwo();
}, []);


  
const deleteRev = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );
  if (confirmDelete) {
    try {
      await axios.delete(
        // `https://api-generator.retool.com/u9XTxw/data/${id}`
        `http://127.0.0.1:8000/products/${id}/`
      );
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }
};


  

/**-----------------------------------------------------------------Finish Edit and delete ----------------------------------------*/
   
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="grid-containerwa">
        <SlideBarBuyer />

        <div className="product-list-container-buyer">
          <h1 className="buyerheader">Product List</h1>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>stock</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((products) => (
                  <tr key={products.id}>
                    <td>{products.title}</td>
                    <td>{products.brand}</td>
                    <td>{products.price}</td>
                    <td>{products.category}</td>
                    <td>{products.stock}</td>
                    <td>
                      <button
                        className="primarys-btn"
                        onClick={() => handleEditClick(products.id)}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        className="dangerssq-btn"
                        onClick={() => deleteRev(products.id)}
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
}

export default ShowSellerProducts;
