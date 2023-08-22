import { useState } from 'react';
import classes from './Register.module.css'
import { useNavigate } from 'react-router-dom';
import api from '../../api/apiFront'

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    birthday: '',
    address: '',
    type: '',
    imageFile: ''
  });



  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!data.username){alert("Polje za unos korisnickog imena je obavezno"); return;}
    if(!data.email){alert("Polje za unos emaila je obavezno"); return;}
    if(!data.password){alert("Polje za unos lozinke je obavezno"); return;}
    if(!data.address){alert("Polje za unos adrese je obavezno"); return;}
    if(!data.birthday){alert("Polje za unos datuma rodjenja je obavezno"); return;}
    if(!data.type){alert("Polje za unos tipa je obavezno"); return;}
    if(!data.imageFile){alert("Polje za unos fotografije je obavezno"); return;}
    if(!data.firstname){alert("Polje za unos  imena je obavezno"); return;}
    if(!data.lastname){alert("Polje za unos prezimena je obavezno"); return;}

    const formData=new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("firstName", data.firstname);
    formData.append("lastName", data.lastname);
    formData.append("address", data.address);
    formData.append("birthday", data.birthday);
    formData.append("type", data.type);
    formData.append("imageFile", data.imageFile);
    try {
      const res = await api.post('api/Check/register', formData, { headers: { "Content-Type":"multipart/form-data" }});
      localStorage.setItem('token', res.data);
      navigate('/home');
    } catch (error) {
      alert(error.response.data);
    }
  };  

  return (
    <div>
      <h2 className={classes.heading}>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className={classes.input}
            placeholder='Korisnicko ime'
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={classes.input}
            placeholder='Lozinka'
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={classes.input}
            placeholder='email'
          />
        </div>
        <div>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
            className={classes.input}
            placeholder='Ime'
          />
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            className={classes.input}
            placeholder='Prezime'
          />
        </div>
        <div>
          <input
            type="date"
            name="birthday"
            min="1900-01-01"
            max={`${new Date().getFullYear() - 18}-01-01`}
            value={data.birthday}
            onChange={handleChange}
            className={classes.input}
            placeholder='Datum rodjenja'
          />
        </div>
        <div>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            className={classes.textarea}
            placeholder='Adresa'
          />
        </div>
        <div>
          <select
            name="type"
            value={data.type}
            onChange={handleChange}
            className={classes.select}
          >
            <option value="">Izaberi tip</option>
            <option value="2">Prodavac</option>
            <option value="1">Kupac</option>
          </select>
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
              accept="image/*"
              onChange={(e) => {
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