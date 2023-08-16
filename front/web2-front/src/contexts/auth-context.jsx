import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import api from '../api/apiFront'
const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    

    const loginHandler = async(loginData) => {
       const res= await api.post('api/Check/login', loginData)
       if(res.status===200){
        setToken(res.data);
        localStorage.setItem('token', res.data);
        navigate('/home');
       }
       else
        alert(res.data);
    };

    const logoutHandler = () => {
        localStorage.clear();
        setToken(null);
        navigate('');
    };

    const userType = () => {
        
    };

        const inType = (type) => {
           
        }

    

    return (
        <AuthContext.Provider
        value={{
            token: token,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            type: userType,
            inType: inType,
        }}>
            
            {
                props.children
            }       
        </AuthContext.Provider>
    );
};

export default AuthContext;