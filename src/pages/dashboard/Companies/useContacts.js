import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllContacts } from "../../../api/contacts";

export const useContacts = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const {
    data: contactsData = {},
    isLoading: isLoadingContacts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contacts", page, limit],
    queryFn: () => getAllContacts({ page, limit }),
    staleTime: 0,
  });

  const contacts = contactsData?.data?.data || [];
  const total = contactsData?.data?.total || 0;
  const currentPage = contactsData?.data?.page || page;
  const currentLimit = contactsData?.data?.limit || limit;

  return {
    isLoadingContacts,
    error,
    contacts,
    total,
    currentPage,
    currentLimit,
    setPage,
    refetch,
  };
};
