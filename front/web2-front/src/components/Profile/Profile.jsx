import { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiFront";

const Profile = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('api/Profile/getProfileInfo');
        setData({ ...data, ...response.data });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    birthday: "",
    address: "",
    image: "",
    imageFile: "",
  });

  const [newPassword, setNewPassword]=useState("");

  const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit  =async (e) => {
    e.preventDefault();
    if(!data.username){
      alert("Polje za unos korisnickog imena ne sme ostati prazno");
      return;
    }
    if(!data.password){
      alert("Polje za unos lozinke ne sme ostati prazno");
      return;
    }
    if(!data.firstname){
      alert("Polje za unos  imena ne sme ostati prazno");
      return;
    }
    if(!data.lastname){
      alert("Polje za unos prezimena ne sme ostati prazno");
      return;
    }
    if(!data.email){
      alert("Polje za unos emaila ne sme ostati prazno");
      return;
    }
    if(!data.address){
      alert("Polje za unos adrese ne sme ostati prazno");
      return;
    }
    
    
    if(!data.birthday){
      alert("Polje za unos datuma rodjenja ne sme ostati prazno");
      return;
    }

    if(data.password!==newPassword)
    {
      alert("Loznike se ne poklapaju");
      return;
    }
    const formData=new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("firstName", data.firstname);
    formData.append("lastName", data.lastname);
    formData.append("address", data.address);
    formData.append("birthday", data.birthday);
    formData.append("imagefile", data.imageFile);
    const response = await api.post('api/Profile/editProfile', formData, { headers: { "Content-Type":"multipart/form-data" }});
    if(response.status===200){
      alert(response.data);
      navigate('/profile');
    }
    alert(response.data);

  };

  return (
    <div>
      <h2 className={classes.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>Korisnicko ime:</label>
          <input type="text" name="username" value={data.username} onChange={handleChange} className={classes.input} />
        </div>
        <div>
          <label className={classes.label}>Lozinka:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={classes.input}
          />
        </div>
        <div>
          <label className={classes.label}>Potvrdi lozinku:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value); 
            }}
            className={classes.input}
          />
        </div>
        <div>
          <label className={classes.label}>Email:</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} className={classes.input} />
        </div>
        <div>
          <label className={classes.label}>Ime:</label>
          <input type="text" name="firstname" value={data.firstname} onChange={handleChange} className={classes.input} />
        </div>
        <div>
          <label className={classes.label}>Prezime:</label>
          <input type="text" name="lastname" value={data.lastname} onChange={handleChange} className={classes.input} />
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
        </div>
        <div>
          <label className={classes.label}>Address:</label>
          <textarea name="address" value={data.address} onChange={handleChange} className={classes.textarea} />
        </div>
        <div>
          <img
            title="Image"
            alt="Add"
            src={data.imageFile ? URL.createObjectURL(data.imageFile) : data.image && convertImage(data.image)}
            className={classes.image}
          />
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
          Sacuvaj
        </button>
      </form>
    </div>
  );
};

export default Profile;
