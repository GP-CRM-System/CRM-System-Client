import { useMutation } from "@tanstack/react-query";
import { deleteCompany } from "../../../api/company";
import queryClient from "../../../store/queryClient";

export const useDeleteCompany = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (companyId) => {
      const res = await deleteCompany(companyId);
      return { success: true, companyId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["companies"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
