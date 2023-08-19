import React from "react";

const Order = ({ order }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.deliveryAddress}</td>
      <td>{order.deliveryTime}</td>
      <td>{order.orderTime}</td>
      <td>{order.orderPrice}</td>
      <td>{order.comment}</td>
      <td>{order.isCanceled ? "Otkazana" : "Aktivna"}</td>
    </tr>
  );
};

export default Order;
