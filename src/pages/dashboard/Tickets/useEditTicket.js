import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { updateTicket } from "../../../api/tickets";

export const useUpdateTicket = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async ({ ticketId, data }) => {
      let statusPayload = [];

      if (data.status) {
        if (typeof data.status === "string") {
          statusPayload = [
            {
              name: data.status,
              date: new Date().toISOString().split("T")[0],
            },
          ];
        } else if (Array.isArray(data.status)) {
          statusPayload = data.status;
        }
      } else {
        statusPayload = [
          {
            name: "New",
            date: new Date().toISOString().split("T")[0],
          },
        ];
      }

      const payload = {
        name: data.name,
        status: statusPayload,
        description: data.description,
        owner: data.owner,
        priority: data.priority || "Medium",
        contact: data.contact,
        source: data.source || "Email",
      };

      const res = await updateTicket(ticketId, payload);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tickets"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error("Update Ticket error:", error.response?.data || error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
