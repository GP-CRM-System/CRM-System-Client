import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../../../api/company";
import queryClient from "../../../store/queryClient";

export const useCreateCompany = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (data) => {
      const payload = {
        name: data.name,
        owner: data.owner || null,
        contact: data.contact || null,
        website: data.website || "",
        email: data.email,
        type: data.type,
        address: data.address,
        industry: data.industry,
        numberOfEmployee: data.numberOfEmployee || null,
      };

      const res = await createCompany(payload);
      return res;
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
