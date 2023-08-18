import React, { useEffect, useState } from "react";
import api from "../../../api/apiFront";
import '../AllOrders/AllOrders.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("api/Profile/getAllOrders");
        setOrders(response.data.$values);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h2>All Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Detalji</th>
            <th>Otkazana</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <button onClick={() => openOrderDetails(order)}>Vidi detalje</button>
              </td>
              <td>{order.isCanceled ? "Da" : "Ne"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalji o porudžbini</h2>
            <p><strong>Id:</strong> {selectedOrder.id}</p>
            <p><strong>Adresa:</strong> {selectedOrder.deliveryAddress}</p>
            <p><strong>Vreme dostave:</strong> {selectedOrder.deliveryTime}</p>
            <p><strong>Vreme isporuke:</strong> {selectedOrder.orderTime}</p>
            <p><strong>Cena dostave:</strong> {selectedOrder.orderPrice}</p>
            <p><strong>Komentar:</strong> {selectedOrder.comment || "N/A"}</p>
            <h3><strong>Stavke:</strong></h3>

            {selectedOrder.Items && selectedOrder.Items.length > 0 ? (
              <div>
                <ul>
                  {selectedOrder.Items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Nema stavki</p>
            )}

            <button onClick={closeOrderDetails}>Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
