import React, { useState, useEffect } from 'react';
import api from '../../../api/apiFront';
import OrderDetailsModal from './OrderDetailModal'; // Prilagodite putanju

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/profile/getBuyersOrders');
        if (response.data && response.data.$values) {
          setOrders(response.data.$values);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h2>Previous Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Is Canceled</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.isCanceled ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => showOrderDetails(order)}>Show Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeOrderDetails} />
      )}
    </div>
  );
};

export default PreviousOrders;
