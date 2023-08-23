import { useContext, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiFront";
import AuthContext from "../../contexts/auth-context";


const Profile = () => {

  const context=useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    password:"",
    firstname: "",
    lastname: "",
    birthday: "",
    address: "",
    image: "",
    imageFile: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        
        const response = await api.get('api/Profile/getProfileInfo');
        const formattedBirthday = formatDateForInput(response.data.birthday);
        setData({ ...data, ...response.data, birthday: formattedBirthday });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchData();
  }, []);

  function formatDateForInput(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  const navigate = useNavigate();
  

  const [newPassword, setNewPassword]=useState("");
  const [password, setPassword]=useState("");

  const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
  };

  const handleClick=()=>{
    alert("Korisnicko ime se ne moze menjati");
  }

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
    

    if (password !== "") {
      if (password !== newPassword) {
        alert("Lozinke se ne poklapaju");
        return;
      }
    }


    const formData=new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    if(!password)
      formData.append("password", data.password);
    else
      formData.append("password", password);

    formData.append("firstName", data.firstname);
    formData.append("lastName", data.lastname);
    formData.append("address", data.address);
    formData.append("birthday", data.birthday);
    formData.append("imagefile", data.imageFile);
    

    try {
      const response = await api.post('api/Profile/editProfile', formData, { headers: { "Content-Type":"multipart/form-data" }});
      console.log(response.data);
      navigate('/profile');
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h2 className={classes.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>Korisnicko ime:</label>
          <input type="text" name="username" value={data.username} readOnly onClick={handleClick} className={classes.input} />
        </div>
        <div>
          <label className={classes.label}>Lozinka:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value); 
            }}            className={classes.input}
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
