import axios from "axios";
import useAuthStore from '../store/authStore';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;