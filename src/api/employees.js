import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const getAllEmployees = async () => {
    const response = await API.get(ENDPOINTS.EMPLOYEE.GetAll);
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await API.get(ENDPOINTS.EMPLOYEE.GetOne(id));
    return response.data;
}