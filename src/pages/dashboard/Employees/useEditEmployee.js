import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { updateEmployee } from "../../../api/employees";

export const useUpdateEmployee = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async ({ employeeId, data }) => {
      const payload = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password || undefined, // optional
        role: data.role,
      };

      if (!payload.password) {
        delete payload.password;
      }

      const res = await updateEmployee(employeeId, payload);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["employees"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error("Update error:", error.response?.data || error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
