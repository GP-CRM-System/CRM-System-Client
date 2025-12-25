import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { deleteOrder } from "../../../api/orders";

export const useDeleteOrder = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (orderId) => {
      const res = await deleteOrder(orderId);
      return { success: true, orderId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
