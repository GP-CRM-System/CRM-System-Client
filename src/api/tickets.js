import API from "./client";
import { ENDPOINTS } from "./endpoints";

export const createTicket = async (data) => {
  const response = await API.post(ENDPOINTS.TICKET.CREATE, data);
  return response.data;
};

export const updateTicket = async (id, data) => {
  const response = await API.put(ENDPOINTS.TICKET.UPDATE(id), data);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await API.delete(ENDPOINTS.TICKET.DELETE(id));
  return response.data;
};

export const getAllTickets = async ({ page = 1, limit = 9 } = {}) => {
  const response = await API.get(ENDPOINTS.TICKET.GetAll, {
    params: { page, limit },
  });
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await API.get(ENDPOINTS.TICKET.GetOne(id));
  return response.data;
};
