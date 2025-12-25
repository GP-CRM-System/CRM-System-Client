import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const getCards = async () => {
    const response = await API.get(ENDPOINTS.ANALYTICS.CARDS);
    return response.data;
};

export const getRevenueTrends = async () => {
    const response = await API.get(ENDPOINTS.ANALYTICS.REVENUE);
    return response.data;
};

export const getTicketStatuses = async () => {
    const response = await API.get(ENDPOINTS.ANALYTICS.TICKETS);
    return response.data;
};

export const getProductPerformance = async () => {
    const response = await API.get(ENDPOINTS.ANALYTICS.PRODUCTS);
    return response.data;
};

export const getLeadConversions = async () => {
    const response = await API.get(ENDPOINTS.ANALYTICS.LEADS);
    return response.data;
};

export const getDashboard = async () => {
    const response = await API.get(ENDPOINTS.ANALYTICS.DASHBOARD);
    return response.data;
};
