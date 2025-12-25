import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createCompany = async (data) => {
  const response = await API.post(ENDPOINTS.COMPANY.CREATE, data);
  return response.data;
};

export const updateCompany = async (id, data) => {
  const response = await API.put(ENDPOINTS.COMPANY.UPDATE(id), data);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await API.delete(ENDPOINTS.COMPANY.DELETE(id));
  return response.data;
};

export const getAllCompanies = async ({ page = 1, limit = 9 } = {}) => {
  const response = await API.get(ENDPOINTS.COMPANY.GetAll, {
    params: { page, limit },
  });
  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await API.get(ENDPOINTS.COMPANY.GetOne(id));
  return response.data;
};
