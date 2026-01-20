import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../../../api/employees";

export const useEmployeeProfile = (employeeId) => {
    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["employee", employeeId],
        queryFn: () => getEmployeeById(employeeId),
        enabled: !!employeeId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    return {
        employee: data?.data || data?.employee || null,
        isLoading,
        error,
        refetch,
    };
};
