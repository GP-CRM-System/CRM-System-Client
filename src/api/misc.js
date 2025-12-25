import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const healthCheck = async () => {
    const response = await API.get(ENDPOINTS.MISC.HEALTH);
    return response.data;
};

export const getDashboardData = async () => {
    const response = await API.get(ENDPOINTS.MISC.DASHBOARD);
    return response.data;
};
