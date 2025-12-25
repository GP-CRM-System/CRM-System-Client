import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "../../../api/company";
import { useState } from "react";

export default function useCompanies() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const {
    data: companiesData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies", page, limit],
    queryFn: () => getAllCompanies({ page, limit }),
    keepPreviousData: true,
  });

  const companies = companiesData?.data?.data || [];
  const total = companiesData?.data?.total || 0;

  const currentPage = companiesData?.data?.page || page;
  const currentLimit = companiesData?.data?.limit || limit;

  return {
    isLoading,
    error,
    companies,
    total,
    currentPage,
    currentLimit,
    setPage,
  };
}
