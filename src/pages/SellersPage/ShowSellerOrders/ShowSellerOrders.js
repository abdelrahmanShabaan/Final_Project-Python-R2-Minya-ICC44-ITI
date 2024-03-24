import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./ShowSellerOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts, getCartItemsCount } from "../../../store/cartSlice";
import { shopping_cart } from "../../../utils/images";
import { formatPrice } from "../../../utils/helpers";


function ShowSellerOrders() {


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

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         // "https://api-generator.retool.com/u9XTxw/data"
  //         "http://127.0.0.1:8000/products/"
  //       );
  //       console.log(response.data)
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

 
  // const handleEditClick = (id) => {
  //   navigate(`/EditSellerProducts/${id}`);
  // };

  // const deleteRev = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this product?"
  //   );
  //   if (confirmDelete) {
  //     try {
  //       await axios.delete(
  //         // `https://api-generator.retool.com/u9XTxw/data/${id}`
  //         `http://127.0.0.1:8000/products/${id}/`
  //       );
  //       loadData();
  //       console.log("Delete successful");
  //     } catch (error) {
  //       console.error("Error deleting review:", error);
  //     }
  //   }
  // };

  // const loadData = async () => {
  //   try {
  //     const res = await axios.get(
  //       // "https://api-generator.retool.com/u9XTxw/data"
  //       "http://127.0.0.1:8000/products/"
  //     );
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.error("Error loading data:", error);
  //   }
  // };


  
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  const itemsCounts = useSelector(getCartItemsCount);
  const navigaters = useNavigate();



  const handleCheckout = () => {
    const queryParams = {
      itemsCount,
      totalAmount,
      carts: encodeURIComponent(JSON.stringify(carts)),
    };

    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/CheckoutPage?${queryString}`);
  };

  // if (carts.length === 0) {
  //   return (
  //     <div className="container my-5">
  //       <div className="empty-cart flex justify-center align-center flex-column font-manrope">
  //         <img src={shopping_cart} alt="" />
  //         <span className="fw-6 fs-15 text-gray">
  //           Your shopping cart is empty.
  //         </span>
  //         {/* <Link to="/" className="shopping-btn bg-orange text-white fw-5">
  //           Go shopping Now
  //         </Link> */}
  //       </div>
  //     </div>
  //   );
  // }


  const [currentPage, setCurrentPage] = useState(1);
  const [cartsPerPage] = useState(5); // Change this to adjust the number of products per page


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCarts= currentPage * cartsPerPage;
  const indexOfFirstCarts = indexOfLastCarts- cartsPerPage;
  const currentCarts = carts.slice(
    indexOfFirstCarts,
    indexOfLastCarts
  );

  const totalPages = Math.ceil(carts.length / cartsPerPage);

    


return (
  <>
  <div className="grid-containerwa">
    <SlideBarBuyer />

    <div className="product-list-container-buyer">
      <h1 className="buyerheader">Ordering List</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentProducts.map((product) => ( */}
              {currentCarts.map((cart, idx) => (
              // <tr key={product.id}>
              <tr key={cart?.id}>
                {/* <td>{product.title}</td> */}
                <td>{idx + 1}</td>
                <td><img
                      src={cart?.thumbnail}
                      alt=""
                      className="cart-modal-item-img"
                      style={{ display: 'block', margin: 'auto' }}
                    /></td>
                <td>{cart?.title}</td>
                <td>{formatPrice(cart?.discountedPrice)}</td>
                <td>{cart?.quantity}</td>
                <td>{formatPrice(cart?.totalPrice)}</td>
                <td>
                  <button
                    className="primarys-btn"
                    // onClick={() => handleEditClick(product.id)}
                  >
                    {" "}
                    Accept{" "}
                  </button>
                  <button
                    className="dangerssq-btn"
                    // onClick={() => deleteRev(product.id)}
                  >
                    {" "}
                    Reject{" "}
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


}export default ShowSellerOrders;