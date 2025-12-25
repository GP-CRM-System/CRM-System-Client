import API from './client';
import { ENDPOINTS } from './endpoints';

export const getRoles = async (params) => {
  const response = await API.get(ENDPOINTS.ROLE.GetAll, { params });
  return response.data;
};

export const createRole = async (data) => {
  const response = await API.post(ENDPOINTS.ROLE.CREATE, data);
  return response.data;
};

export const getRole = async (id) => {
  const response = await API.get(ENDPOINTS.ROLE.GetOne(id));
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
