import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import classes from './Login.module.css'
import { GoogleLogin } from "@react-oauth/google";


const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email:"",
    password:"",
  });
  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    

    
  };

  const handleGoogleSignIn = async (e) => {
      
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
            className={classes.input}
          />
        </div>
        <div>
          <label className={classes.label}>Lozinka:</label>
          <input
            type="password"
            id="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
            className={classes.input}
          />
        </div>
        <button type="submit" className={classes.submitButton}>Prijavite se</button>
      </form>
      <p className={classes.paragraph}>
        {"Ako nemate nalog registrujte se ovde "}
        <Link to={"/register"} className={classes.link}>ovde.</Link>
      </p>
      <div>
        <GoogleLogin onSuccess={handleGoogleSignIn} onError={e => alert("Nepostojeci email.")}/>
      </div>
    </div>
  );
};

export default Login;
