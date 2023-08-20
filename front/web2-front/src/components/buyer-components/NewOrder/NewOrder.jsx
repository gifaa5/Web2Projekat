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

  const createNewOrder = async (orderDetails) => {
    try {
      // Implementacija za slanje narudžbine na server
      const response = await api.post('/api/Profile/createNewOrder', orderDetails); // Prilagodite stazu zahteva i format podataka
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating new order:', error);
    }
  };

  const openItemModal = (product) => {
    setSelectedProduct(product);
  };

  const closeItemModal = () => {
    setSelectedProduct(null);
  };

  const handleOrderSubmit = (orderDetails) => {
    if (orderDetails) {
      createNewOrder(orderDetails);
    }
    closeItemModal();
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
