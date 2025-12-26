import { create } from 'zustand';

const useLookupStore = create((set) => ({
    contacts: [],
    companies: [],
    employees: [],

    setContacts: (contacts) => set({ contacts }),
    setCompanies: (companies) => set({ companies }),
    setEmployees: (employees) => set({ employees }),

    // Search utilities
    getContact: (id) => (state) => state.contacts.find(c => c._id === id),
    getCompany: (id) => (state) => state.companies.find(c => c._id === id),
    getEmployee: (id) => (state) => state.employees.find(e => e._id === id),
}));

export default useLookupStore;
