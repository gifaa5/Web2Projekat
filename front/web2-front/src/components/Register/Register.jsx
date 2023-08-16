import { useState } from 'react';
import classes from './Register.module.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    birthday: '',
    address: '',
    type: '',
    imageFile: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div>
      <h2 className={classes.heading}>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.username && <span className={classes.error}>{errors.username}</span>}
        </div>
        <div>
          <label className={classes.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.password && <span className={classes.error}>{errors.password}</span>}
        </div>
        <div>
          <label className={classes.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.email && <span className={classes.error}>{errors.email}</span>}
        </div>
        <div>
          <label className={classes.label}>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.fullName && <span className={classes.error}>{errors.fullName}</span>}
        </div>
        <div>
          <label className={classes.label}>Birthday:</label>
          <input
            type="date"
            name="birthday"
            min="1900-01-01"
            max={`${new Date().getFullYear() - 18}-01-01`}
            value={data.birthday}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.birthday && <span className={classes.error}>{errors.birthday}</span>}
        </div>
        <div>
          <label className={classes.label}>Address:</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            className={classes.textarea}
          />
          {errors.address && <span className={classes.error}>{errors.address}</span>}
        </div>
        <div>
          <label className={classes.label}>User Type:</label>
          <select
            name="type"
            value={data.type}
            onChange={handleChange}
            className={classes.select}
          >
            <option value="">Select a type</option>
            <option value="1">Seller</option>
            <option value="2">Buyer</option>
          </select>
          {errors.type && <span className={classes.error}>{errors.type}</span>}
        </div>
        <div>
          <img
            title="Image"
            width={200}
            height={100}
            alt="Add"
            src={data.imageFile && URL.createObjectURL(data.imageFile)}
            className={classes.image}
          />
          <span>
            <input
              type="file"
              name="imageFile"
              accept="image/jpg"
              onChange={(e) => {
                console.log(e);
                setData({ ...data, imageFile: e.target.files[0] });
              }}
            />
          </span>
        </div>
        <div>
          <button type="submit" className={classes.submitButton}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;