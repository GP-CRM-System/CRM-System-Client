import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createEmployee = async (data) => {
  const response = await API.post(ENDPOINTS.EMPLOYEE.CREATE, data);
  return response.data;
};

export const updateEmployee = async (id, data) => {
  const response = await API.put(ENDPOINTS.EMPLOYEE.UPDATE(id), data);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(ENDPOINTS.EMPLOYEE.DELETE(id));
  return response.data;
};

export const getAllEmployees = async ({ page = 1, limit = 9 } = {}) => {
  const response = await API.get(ENDPOINTS.EMPLOYEE.GetAll, {
    params: { page, limit },
  });
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await API.get(ENDPOINTS.EMPLOYEE.GetOne(id));
  return response.data;
};
