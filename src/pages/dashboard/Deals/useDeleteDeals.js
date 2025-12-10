import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { deleteDeal } from "../../../api/deals";

export const useDeleteDeal = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (dealId) => {
      const res = await deleteDeal(dealId);
      return { success: true, dealId };
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
