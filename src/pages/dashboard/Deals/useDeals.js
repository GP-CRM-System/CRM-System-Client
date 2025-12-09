import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllDeals } from "../../../api/deals";

export default function useDeals() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const {
    data: dealsData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deals", page, limit],
    queryFn: () => getAllDeals({ page, limit }),
    keepPreviousData: true,
  });

  const deals = dealsData?.data?.deals;
  const total = dealsData?.data?.total || dealsData?.data?.deals?.length || 0;
  const currentPage = dealsData?.data?.page || page;
  const currentLimit = dealsData?.data?.limit || limit;

  return {
    isLoading,
    error,
    deals,
    total,
    currentPage,
    currentLimit,
    setPage,
  };
}
