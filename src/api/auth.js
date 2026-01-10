import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const login = async (credentials) => {
    const response = await API.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
};

export const REGISTER = async (userData) => {
    const response = await API.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
};

export const REFRESH = async (id) => {
    const response = await API.put(ENDPOINTS.AUTH.REFRESH(id));
    return response.data;
};

export const logout = async () => {
    try {
        const response = await API.get(ENDPOINTS.AUTH.LOGOUT);
        return response.data;
    } catch (error) {
        console.error('Logout API call failed:', error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    const response = await API.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
};

export const verifyResetToken = async (token) => {
    const response = await API.get(ENDPOINTS.AUTH.VERIFY_RESET_TOKEN(token));
    return response.data;
};

export const resetPassword = async (data) => {
    const response = await API.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
};

export const changePassword = async (data) => {
    const response = await API.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    return response.data;
};

export const initiateGoogleAuth = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4650/api/v1";
    window.location.href = `${baseURL}${ENDPOINTS.AUTH.GOOGLE}`;
};