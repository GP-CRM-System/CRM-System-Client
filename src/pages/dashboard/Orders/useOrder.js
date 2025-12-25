import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllOrders } from "../../../api/orders";

export default function useOrders() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const {
    data: ordersData = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => getAllOrders({ page, limit }),
    staleTime: 0,
  });

  const orders = ordersData?.data?.data || [];
  const total = ordersData?.data?.total || 0;
  const currentPage = ordersData?.data?.page || page;
  const currentLimit = ordersData?.data?.limit || limit;

  return {
    isLoading,
    error,
    orders,
    total,
    currentPage,
    currentLimit,
    setPage,
    refetch,
  };
}
