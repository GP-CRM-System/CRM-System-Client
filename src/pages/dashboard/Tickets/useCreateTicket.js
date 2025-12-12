import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { createTicket } from "../../../api/tickets";

export const useCreateTicket = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (form) => {
      const payload = {
        name: form.name,
        status:
          form.status && form.status.length > 0
            ? form.status.map((s) => ({
                statusType: s.statusType,   
                date: s.date,
              }))
            : [
                {
                  statusType: "New",    
                  date: new Date().toISOString(),    
                },
              ],
        description: form.description,
        owner: form.owner,
        priority: form.priority || "Medium",
        contact: form.contact,
        source: form.source || "Email",
      };

      try {
        const res = await createTicket(payload);

        if (res.error || res.message === "Error creating ticket") {
          throw new Error(JSON.stringify(res.error));
        }

        return res;
      } catch (err) {
        console.error("Error creating ticket:", err.response?.data || err);
        throw err;
      }
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
