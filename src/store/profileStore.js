import { create } from 'zustand';

const useProfileStore = create((set) => ({
    activeTab: 'profile', // 'profile', 'security', 'role', 'preferences'
    isEditing: false,

    setActiveTab: (tab) => set({ activeTab: tab }),
    setIsEditing: (isEditing) => set({ isEditing }),
    reset: () => set({ activeTab: 'profile', isEditing: false }),
}));

export default useProfileStore;
