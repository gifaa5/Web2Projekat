import axios from 'axios';


const api = axios.create({
    baseURL: "https://localhost:5000", // Adresa vašeg .NET Web API-ja    
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    try{
        const token = localStorage.getItem("token");
        if(token){
            return {...config, headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }};
        }
        return config;
    } catch(e) {
        console.log(e);
        return Promise.reject(e);
    }
});

export default api;