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
        console.log(res.data);
        navigate('/home');
       }
       else
        alert(res.data);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
        navigate('/');
    };

    const userType =  () => {
        try {
            if (!token)
                return null;
            const tokenDecoded = jwtDecode(token);
            
            return tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        } catch (e) {
            console.log(e);
        }
    };
    
    
    

    

    return (
        <AuthContext.Provider
        value={{
            token: token,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            type: userType,
        }}>
            
            {
                props.children
            }       
        </AuthContext.Provider>
    );
};

export default AuthContext;