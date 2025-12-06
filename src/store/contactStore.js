// src/store/contactStore.js
import { create } from 'zustand';

const useContactStore = create((set) => ({
    contacts: [],
    selectedContacts: [], // array of selected contact IDs
    filterTab: 'All',
    isLoading: false,
    error: null,

    setContacts: (contacts) => set({ contacts }),
    setSelectedContacts: (selectedContacts) => set({ selectedContacts }),
    setFilterTab: (filterTab) => set({ filterTab }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    // Utility: select/deselect a contact
    toggleContactSelection: (id) => set((state) => {
        const selected = state.selectedContacts.includes(id)
            ? state.selectedContacts.filter(cid => cid !== id)
            : [...state.selectedContacts, id];
        return { selectedContacts: selected };
    }),
    // Utility: select/deselect all
    selectAllContacts: () => set((state) => ({ selectedContacts: state.contacts.map(c => c._id) })),
    deselectAllContacts: () => set({ selectedContacts: [] }),
}));

export default useContactStore;
