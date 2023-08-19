import React, { useState } from "react";
import api from "../../../api/apiFront";
import "./AddProduct.css"; // Uvezivanje CSS-a

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    amount: 0,
    description: "",
    imageFile: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!productData.name){alert("Ime je obavezno");return;}
    if(!productData.price){alert("Cena je obavezna");return;}
    if(!productData.amount){alert("Kolicina je obavezna");return;}
    if(!productData.description){alert("Opis je obavezan");return;}

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("amount", productData.amount);
    formData.append("description", productData.description);
    formData.append("imageFile", productData.imageFile);
    try {
      const res=await api.post("api/Profile/addProduct", formData, { headers: { "Content-Type":"multipart/form-data" }});
      alert("Product added successfully!");
      console.log(res.data);
      setProductData({
        name: "",
        price: 0,
        amount: 0,
        description: "",
        imageFile: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="form">
      <h2 className="heading">Add Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label className="label">Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Amount:</label>
        <input
          type="number"
          name="amount"
          value={productData.amount}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="input"
          rows="4"
        />

        <label className="label">Image:</label>
        <input
          type="file"
          name="imageFile"
          onChange={handleImageChange}
          className="input"
          accept="image/*"
          required
        />

        <button type="submit" className="submitButton">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
