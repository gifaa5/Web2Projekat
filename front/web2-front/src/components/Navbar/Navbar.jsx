import { useContext } from 'react';
import classes from './Navbar.module.css'
import AuthContext from "../../contexts/auth-context";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const context = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    
  }

  return (
    <nav className={classes.navbar}>
      <ul>
        {context.token && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
        <li>
          {context.token ? (
            <Link to="/profile" className={classes.link}>
              Profile
            </Link>
          ) : (
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          )}
        </li>
        <li>
          {context.token ? (
            <button onClick={handleLogout} className={classes.button}>
              Logout
            </button>
          ) : (
            <Link to="/" className={classes.link}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;