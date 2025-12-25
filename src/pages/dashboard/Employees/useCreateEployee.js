import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { createEmployee } from "../../../api/employees";

export const useCreateEmployee = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (form) => {
      const payload = {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      try {
        const res = await createEmployee(payload);
        return res;
      } catch (err) {
        console.error("Error creating employee:", err.response?.data || err);
        throw err;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["employees"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
