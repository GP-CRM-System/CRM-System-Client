import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createDeal = async (data) => {
  const response = await API.post(ENDPOINTS.DEAL.CREATE, data);
  return response.data;
};

export const updateDeal = async (id, data) => {
  const response = await API.put(ENDPOINTS.DEAL.UPDATE(id), data);
  return response.data;
};

export const deleteDeal = async (id) => {
  const response = await API.delete(ENDPOINTS.DEAL.DELETE(id));
  return response.data;
};

export const getAllDeals = async ({ page = 1, limit = 9 } = {}) => {
  const response = await API.get(ENDPOINTS.DEAL.GetAll, {
    params: { page, limit },
  });
  return response.data;
};

export const getDealById = async (id) => {
  const response = await API.get(ENDPOINTS.DEAL.GetOne(id));
  return response.data;
};
