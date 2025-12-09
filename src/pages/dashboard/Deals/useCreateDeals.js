import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { createDeal } from "../../../api/deals";

export const useCreateDeal = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (form) => {
      const payload = {
        name: form.name,
        amount: form.amount,
        owner: form.owner || null,
        contact: form.contact || null,
        priority: form.priority,
        company: form.company,
        stage: [
          {
            name: form.stage || "Contract Sent",
            date: new Date().toISOString(),
          },
        ],
      };

      try {
        const res = await createDeal(payload);
        return res;
      } catch (err) {
        console.error("Error creating deal:", err.response?.data || err);
        throw err;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["deals"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
