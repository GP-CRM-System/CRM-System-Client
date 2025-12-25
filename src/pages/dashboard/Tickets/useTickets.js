import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "../../../api/tickets";
import { useState } from "react";

export const useTickets = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const {
    data: ticketsData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tickets", page, limit],
    queryFn: () => getAllTickets({ page, limit }),
    keepPreviousData: true,
  });

  const tickets = ticketsData?.data?.data || [];
  const total = ticketsData?.data?.total || 0;

  const currentPage = ticketsData?.data?.page || page;
  const currentLimit = ticketsData?.data?.limit || limit;

  return {
    isLoading,
    error,
    tickets,
    total,
    currentPage,
    currentLimit,
    setPage,
  };
};
