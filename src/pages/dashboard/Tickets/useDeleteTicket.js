import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { deleteTicket } from "../../../api/tickets";

export const useDeleteTicket = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (ticketId) => {
      const res = await deleteTicket(ticketId);
      return { success: true, ticketId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tickets"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
