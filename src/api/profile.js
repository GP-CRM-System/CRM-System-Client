import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const getProfile = async (id) => {
    const response = await API.get(ENDPOINTS.PROFILE.GET(id));
    return response.data;
};

export const updateProfile = async ({ id, data }) => {
    const response = await API.put(ENDPOINTS.PROFILE.UPDATE(id), data);
    return response.data;
};

export const changePassword = async ({ id, data }) => {
    const response = await API.post(ENDPOINTS.PROFILE.CHANGE_PASSWORD(id), data);
    return response.data;
};
