import React, { useEffect, useState } from "react";
import api from "../../../api/apiFront";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("api/Profile/getSellersOrders");
      setOrders(response.data.$values);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h2 className="heading">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Delivery Address</th>
              <th>Delivery Time</th>
              <th>Order Time</th>
              <th>Order Price</th>
              <th>Comment</th>
              <th>Is Canceled</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.deliveryTime}</td>
                <td>{order.orderTime}</td>
                <td>{order.orderPrice}</td>
                <td>{order.comment}</td>
                <td>{order.isCanceled ? "Canceled" : "Not Canceled"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
