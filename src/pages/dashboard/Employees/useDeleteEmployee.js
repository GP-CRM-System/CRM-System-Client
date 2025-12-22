import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { deleteEmployee } from "../../../api/employees";

export const useDeleteEmployee = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (employeeId) => {
      const res = await deleteEmployee(employeeId);
      return { success: true, employeeId };
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
