import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerOrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://retoolapi.dev/tCg7wp/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`https://retoolapi.dev/tCg7wp/orders/${orderId}`, { status: newStatus });
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrders(updatedOrders);
      console.log('Order status updated:', response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      {orders.map(order => (
        <div key={order.id}>
          <h2>Order ID: {order.id}</h2>
          <p>Name: {order.name}</p>
          <p>Rate: {order.rate}</p>
          <p>Status: {order.status}</p>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
          <div>
            {order.status === 'pending' && (
              <>
                <button onClick={() => handleChangeStatus(order.id, 'accepted')}>Accept</button>
                <button onClick={() => handleChangeStatus(order.id, 'rejected')}>Reject</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrderPage;