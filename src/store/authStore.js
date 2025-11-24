// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            permissions: {}, // Role-based permissions object: { Company: { read: true, ... }, ... }
            isAuthenticated: false,

            setCredentials: (responseData) => {
				console.log('setCredentials called with:', responseData);


				let userData = null;
				let permissionsData = {};

				if (responseData.user) {
					userData = responseData.user;
					permissionsData = responseData.user?.role || {};
				} else if (responseData.data?.user) {
					userData = responseData.data.user;
					permissionsData = responseData.data.user?.role || {};
				} else if (responseData.data) {
					userData = responseData.data;
					permissionsData = responseData.data?.role || {};
				}
				
				console.log('Extracted user data:', userData);
				console.log('Extracted permissions:', permissionsData);
                
                set(() => ({
                    user: userData,
                    permissions: permissionsData, // Store the role object with permissions
                    isAuthenticated: !!userData,
                }));
                
                console.log('Permissions stored:', permissionsData);
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