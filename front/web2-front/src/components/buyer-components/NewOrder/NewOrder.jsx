import React, { useState, useEffect } from 'react';
import Item from './Item'; // Proverite tačan putanju za import
import api from '../../../api/apiFront';
import "./NewOrder.css";

const NewOrder = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/profile/getAllProducts');
        // Izmene ovde: Proveri da li postoji "$values" u odgovoru i izdvoji niz proizvoda
        if (response.data && response.data.$values) {
          setProducts(response.data.$values);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const createNewOrder = async (orderDetailsArray) => {
    try {
      const formData = new FormData();
      formData.append('deliveryAddress', orderDetailsArray[0].address);
      formData.append('comment', orderDetailsArray[0].comment);
      
      const item = {
        Name: orderDetailsArray[0].name,
        Price: orderDetailsArray[0].price,
        Amount: orderDetailsArray[0].amount
      };
      
      formData.append('items', JSON.stringify([item]));
    
      const response = await api.post('/api/Profile/createNewOrder', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating new order:', error);
    }
    
  };

  const handleOrderSubmit = (orderDetails) => {
    if (orderDetails) {
      createNewOrder(orderDetails);
    }
    closeItemModal();
  };

  const openItemModal = (product) => {
    setSelectedProduct(product);
  };

  const closeItemModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="new-order">
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => openItemModal(product)}>Order</button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <Item product={selectedProduct} onSubmit={handleOrderSubmit} />
      )}
    </div>
  );
};

export default NewOrder;
