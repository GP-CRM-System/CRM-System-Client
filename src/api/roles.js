import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createRole = async (data) => {
  const response = await API.post(ENDPOINTS.ROLE.CREATE, data);
  return response.data;
};

export const updateRole = async (id, data) => {
  const response = await API.put(ENDPOINTS.ROLE.UPDATE(id), data);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await API.delete(ENDPOINTS.ROLE.DELETE(id));
  return response.data;
};

export const getAllRoles = async ({ page = 1, limit = 10 } = {}) => {
  const response = await API.get(ENDPOINTS.ROLE.GetAll, {
    params: { page, limit },
  });
  return response.data;
};

export const getRoleById = async (id) => {
  const response = await API.get(ENDPOINTS.ROLE.GetOne(id));
  return response.data;
};
