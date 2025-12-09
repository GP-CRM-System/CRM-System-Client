import { useQuery } from "@tanstack/react-query";
import { getAllContacts } from "../../../api/contacts";

export const useContacts = () => {
  const { data: contactsData, isLoading: isLoadingContacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContacts,
  });

  let contacts = [];

  if (contactsData) {
    if (Array.isArray(contactsData)) {
      contacts = contactsData;
    } else if (contactsData.data && Array.isArray(contactsData.data.contacts)) {
      contacts = contactsData.data.contacts;
    } else if (Array.isArray(contactsData.contacts)) {
      contacts = contactsData.contacts;
    }
  }

  return { contacts, isLoadingContacts };
};
