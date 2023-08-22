import React, { useState } from 'react';
import "./Item.css"

const Item = ({ product, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!quantity || !address || !comment) {
      alert('All fields are required.');
      return;
    }

    const orderDetails = {
      name: product.name,
      price: product.price,
      amount: quantity,
      address,
      comment
    };

    onSubmit([orderDetails]); // Ovde šaljemo niz sa jednim elementom
  };

  return (
    <div className="item-modal">
      <div className="item-content">
        <button className="close-button" onClick={() => onSubmit(null)}>X</button>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <form onSubmit={handleOrderSubmit}>
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
          <label>
            Delivery Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label>
            Comment:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Item;
