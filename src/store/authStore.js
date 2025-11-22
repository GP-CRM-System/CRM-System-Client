// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            permissions: {}, // Role-based permissions object: { Company: { read: true, ... }, ... }
            isAuthenticated: false,

            setCredentials: ({ user }) => {
                console.log('setCredentials called with user:', user);
                console.log('User role:', user?.role);
                
                set(() => ({
                    user: user || null,
                    permissions: user?.role || {}, // Store the role object with permissions
                    isAuthenticated: !!user,
                }));
                
                console.log('Permissions stored:', user?.role);
            },

            logout: () => {
                set(() => ({
                    user: null,
                    permissions: {},
                    isAuthenticated: false,
                }));
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialPersist: (state) => ({
                user: state.user,
                permissions: state.permissions,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;