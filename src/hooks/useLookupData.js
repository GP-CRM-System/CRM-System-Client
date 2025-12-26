import { useQuery } from "@tanstack/react-query";
import { getAllContacts } from "../api/contacts";
import { getAllCompanies } from "../api/company";
import { getAllEmployees } from "../api/employees";
import useLookupStore from "../store/lookupStore";
import { useEffect } from "react";

export const useLookupData = () => {
    const { setContacts, setCompanies, setEmployees } = useLookupStore();

    // Fetch all contacts (high limit to get everything for lookups)
    const contactsQuery = useQuery({
        queryKey: ["lookup-contacts"],
        queryFn: () => getAllContacts({ page: 1, limit: 1000 }),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Fetch all companies
    const companiesQuery = useQuery({
        queryKey: ["lookup-companies"],
        queryFn: () => getAllCompanies({ page: 1, limit: 1000 }),
        staleTime: 5 * 60 * 1000,
    });

    // Fetch all employees
    const employeesQuery = useQuery({
        queryKey: ["lookup-employees"],
        queryFn: () => getAllEmployees({ page: 1, limit: 1000 }),
        staleTime: 5 * 60 * 1000,
    });

    // Sync to Zustand store when data changes
    useEffect(() => {
        if (contactsQuery.data?.data?.data) {
            setContacts(contactsQuery.data.data.data);
        }
    }, [contactsQuery.data, setContacts]);

    useEffect(() => {
        if (companiesQuery.data?.data?.data) {
            setCompanies(companiesQuery.data.data.data);
        }
    }, [companiesQuery.data, setCompanies]);

    useEffect(() => {
        if (employeesQuery.data?.data?.data) {
            setEmployees(employeesQuery.data.data.data);
        }
    }, [employeesQuery.data, setEmployees]);

    return {
        isLoading: contactsQuery.isLoading || companiesQuery.isLoading || employeesQuery.isLoading,
        contacts: contactsQuery.data?.data?.data || [],
        companies: companiesQuery.data?.data?.data || [],
        employees: employeesQuery.data?.data?.data || [],
        refetchAll: () => {
            contactsQuery.refetch();
            companiesQuery.refetch();
            employeesQuery.refetch();
        }
    };
};
