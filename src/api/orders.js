import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createOrder = async (data) => {
  const response = await API.post(ENDPOINTS.ORDER.CREATE, data);
  return response.data;
};

export const updateOrder = async (id, data) => {
  const response = await API.put(ENDPOINTS.ORDER.UPDATE(id), data);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await API.delete(ENDPOINTS.ORDER.DELETE(id));
  return response.data;
};

export const getAllOrders = async ({ page = 1, limit = 9 } = {}) => {
  const response = await API.get(ENDPOINTS.ORDER.GetAll, {
    params: { page, limit },
  });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await API.get(ENDPOINTS.ORDER.GetOne(id));
  return response.data;
};
