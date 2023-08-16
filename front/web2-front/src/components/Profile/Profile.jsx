import { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    newPassword: "",
    email: "",
    fullName: "",
    birthday: "",
    address: "",
    image: "",
    imageFile: "",
  });

  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
  };

  return (
    <div>
      <h2 className={classes.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>Username:</label>
          <input type="text" name="username" value={data.username} onChange={handleChange} className={classes.input} />
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
          <label className={classes.label}>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
            className={classes.input}
          />
          {errors.newPassword && <span className={classes.error}>{errors.newPassword}</span>}
        </div>
        <div>
          <label className={classes.label}>Email:</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} className={classes.input} />
          {errors.email && <span className={classes.error}>{errors.email}</span>}
        </div>
        <div>
          <label className={classes.label}>Full Name:</label>
          <input type="text" name="fullName" value={data.fullName} onChange={handleChange} className={classes.input} />
          {errors.fullName && <span className={classes.error}>{errors.fullName}</span>}
        </div>
        <div>
          <label className={classes.label}>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={data.birthday}
            onChange={handleChange}
            className={classes.input}
            min="1900-01-01"
            max={`${new Date().getFullYear() - 18}-01-01`}
          />
          {errors.birthday && <span className={classes.error}>{errors.birthday}</span>}
        </div>
        <div>
          <label className={classes.label}>Address:</label>
          <textarea name="address" value={data.address} onChange={handleChange} className={classes.textarea} />
          {errors.address && <span className={classes.error}>{errors.address}</span>}
        </div>
        <div>
          {/* <img
            title="Image"
            alt="Add"
            src={data.imageFile ? URL.createObjectURL(data.imageFile) : data.image && convertImage(data.image)}
            className={classes.image}
          /> */}
        </div>
        <div>
          <input
            type="file"
            name="imageFile"
            accept="image/jpg"
            onChange={(e) => {
              setData({ ...data, imageFile: e.target.files[0] });
            }}
            className={classes.fileInput}
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
