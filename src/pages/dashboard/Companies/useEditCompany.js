import { useMutation } from "@tanstack/react-query";
import { updateCompany } from "../../../api/company";
import queryClient from "../../../store/queryClient";

export const useUpdateCompany = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async ({ companyId, data }) => {
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

      const res = await updateCompany(companyId, payload);
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
