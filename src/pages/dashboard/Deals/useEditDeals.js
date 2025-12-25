import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { updateDeal } from "../../../api/deals";

export const useUpdateDeal = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async ({ dealId, data }) => {
      let stagePayload;

      if (data.stage) {
        if (typeof data.stage === "string") {
          stagePayload = [
            {
              name: data.stage,
              date: new Date().toISOString(),
            },
          ];
        } else if (Array.isArray(data.stage)) {
          stagePayload = data.stage;
        }
      }
      const payload = {
        name: data.name,
        amount: data.amount,
        owner: data.owner || null,
        contact: data.contact || null,
        priority: data.priority,
        company: data.company || null,
        stage: stagePayload, //
      };

      const res = await updateDeal(dealId, payload);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["deals"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error(" Update error:", error.response?.data || error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
