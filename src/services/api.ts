import axios from "axios";


const api = axios.create({
    baseURL: "https://erp-back-6jmi.onrender.com",
    //import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;