import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./ShowBuyerProducts.css";

function ShowBuyerProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Change this to adjust the number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          // "https://api-generator.retool.com/u9XTxw/data"
          "http://127.0.0.1:8000/products/"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleEditClick = (id) => {
    navigate(`/EditBuyerProducts/${id}`);
  };

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
        // "https://api-generator.retool.com/u9XTxw/data"
        "http://127.0.0.1:8000/products/"
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

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
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="primarys-btn"
                        onClick={() => handleEditClick(product.id)}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        className="dangerssq-btn"
                        onClick={() => deleteRev(product.id)}
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

export default ShowBuyerProducts;
