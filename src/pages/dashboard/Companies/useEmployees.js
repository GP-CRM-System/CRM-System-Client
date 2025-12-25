import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllEmployees } from "../../../api/employees";

export const useEmployees = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const {
    data: employeesData = {},
    isLoading: isLoadingEmployees,
    error,
    refetch,
  } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: () => getAllEmployees({ page, limit }),
    staleTime: 0,
  });

  const employees = employeesData?.data?.data || [];
  const total = employeesData?.data?.total || 0;
  const currentPage = employeesData?.data?.page || page;
  const currentLimit = employeesData?.data?.limit || limit;

  return {
    isLoadingEmployees,
    error,
    employees,
    total,
    currentPage,
    currentLimit,
    setPage,
    refetch,
  };
};
