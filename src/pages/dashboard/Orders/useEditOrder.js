import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { updateOrder } from "../../../api/orders";

export const useUpdateOrder = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async ({ orderId, data }) => {
      let stagePayload = [];

      if (data.stage) {
        if (typeof data.stage === "string") {
          stagePayload = [
            {
              name: data.stage,
              date: new Date().toISOString().split("T")[0],
            },
          ];
        } else if (Array.isArray(data.stage)) {
          stagePayload = data.stage;
        }
      } else {
        stagePayload = [
          {
            name: "Open",
            date: new Date().toISOString().split("T")[0],
          },
        ];
      }

      const payload = {
        description: data.description,
        owner: data.owner,
        contact: data.contact,
        employee: data.employee,
        stage: stagePayload,
        products: Array.isArray(data.products) ? data.products : [],
      };

      const res = await updateOrder(orderId, payload);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error("Update Order error:", error.response?.data || error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
