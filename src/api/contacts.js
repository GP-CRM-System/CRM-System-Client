import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createContact = async (data) => {
    const response = await API.post(ENDPOINTS.CONTACT.CREATE, data);
    return response.data;
};

export const updateContact = async (id, data) => {
    const response = await API.put(ENDPOINTS.CONTACT.UPDATE(id), data);
    return response.data;
};

export const deleteContact = async (id) => {
    const response = await API.delete(ENDPOINTS.CONTACT.DELETE(id));
    return response.data;
};

export const getAllContacts = async () => {
    const response = await API.get(ENDPOINTS.CONTACT.GetAll);
    return response.data;
};

export const getContactById = async (id) => {
    const response = await API.get(ENDPOINTS.CONTACT.GetOne(id));
    return response.data;
}