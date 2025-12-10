import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllEmployees } from "../../../api/employees";

export default function useEmployees() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const {
    data: employeesData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: () => getAllEmployees({ page, limit }),
    keepPreviousData: true,
  });

  const employees = employeesData?.data?.employees;
  const total =
    employeesData?.data?.total || employeesData?.data?.employees?.length || 0;
  const currentPage = employeesData?.data?.page || page;
  const currentLimit = employeesData?.data?.limit || limit;

  return {
    isLoading,
    error,
    employees,
    total,
    currentPage,
    currentLimit,
    setPage,
  };
}
