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
