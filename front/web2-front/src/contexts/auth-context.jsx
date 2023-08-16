import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    

    const loginHandler = async(loginData) => {
       
    };

    const logoutHandler = () => {
        
    };

    const userType = () => {
        
    };

        const inType = (type) => {
           
        }

    const googleLogin = async(data) => {
       
    }

    return (
        <AuthContext.Provider
        value={{
            token: token,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            type: userType,
            inType: inType,
            googleLogin: googleLogin
        }}>
            
            {
                props.children
            }       
        </AuthContext.Provider>
    );
};

export default AuthContext;