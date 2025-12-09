import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../api/employees";

export const useEmployees = () => {
  const { data: employeesData, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  let employees = [];

  if (employeesData) {
    if (Array.isArray(employeesData)) {
      employees = employeesData;
    } else if (
      employeesData.data &&
      Array.isArray(employeesData.data.employees)
    ) {
      employees = employeesData.data.employees;
    } else if (Array.isArray(employeesData.employees)) {
      employees = employeesData.employees;
    }
  }

  return { employees, isLoadingEmployees };
};
