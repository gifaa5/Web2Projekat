import React from 'react';

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="order-details-modal">
      <div className="modal-content">
        <h2>Order Details</h2>
        <p>Order ID: {order.id}</p>
        <p>Delivery Address: {order.deliveryAddress}</p>
        <p>Order Time: {order.orderTime}</p>
        <p>Delivery Time: {order.deliveryTime}</p>
        <p>Order Price: {order.orderPrice}</p>
        <p>Comment: {order.comment || 'N/A'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
