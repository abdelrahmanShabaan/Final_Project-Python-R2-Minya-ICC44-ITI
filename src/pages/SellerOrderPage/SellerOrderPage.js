import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader/Loader";
import "./SellerOrderPage.css"; // Create a CSS file for SellerOrderPage styles
import { useNavigate } from "react-router-dom";

const SellerOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /** Redirection */
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://retoolapi.dev/3DPp5R/orders/");
      const updatedOrders = await Promise.all(
        response.data.map(async (order) => {
          const productResponse = await axios.get(
            `http://127.0.0.1:8000/products/${order.productid}/`
          );
          const productDetails = productResponse.data;

          // Decrease stock
          const newStock = productDetails.stock - order.quantity;
          await axios.patch(
            `http://127.0.0.1:8000/products/${order.productid}/`,
            { stock: newStock }
          );

          return { ...order, productDetails };
        })
      );
      setOrders(updatedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `https://retoolapi.dev/3DPp5R/orders/${orderId}/`,
        { status: newStatus }
      );
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrders(updatedOrders);
      console.log("Order status updated:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <main>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3 style={{ color: "white" }}>Orders</h3>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <div className="product-list">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div className="product-itemx" key={order.id}>
                        <h4>Order ID: {order.id}</h4>
                        <Product product={order.productDetails} />
                        <p>
                          <strong>Status:</strong> {order.status}
                        </p>
                        <div className="order-actionsx">
                          {order.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "accepted")
                                }
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default SellerOrderPage;
