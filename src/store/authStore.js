// src/store/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            permissions: {}, // Role-based permissions object: { Company: { read: true, ... }, ... }
            isAuthenticated: false,
            isInitialized: false, // Track if we've checked auth status

            setCredentials: (responseData) => {
                console.log('🔐 setCredentials called with:', responseData);

                let userData = null;
                let permissionsData = {};

                // Extract user data - handle both 'user' and 'emp' fields
                if (responseData.user) {
                    userData = responseData.user;
                    console.log('📦 Found user in responseData.user');
                } else if (responseData.emp) {
                    userData = responseData.emp;
                    console.log('📦 Found user in responseData.emp');
                } else if (responseData.data?.user) {
                    userData = responseData.data.user;
                    console.log('📦 Found user in responseData.data.user');
                } else if (responseData.data?.emp) {
                    userData = responseData.data.emp;
                    console.log('📦 Found user in responseData.data.emp');
                } else if (responseData.data) {
                    userData = responseData.data;
                    console.log('📦 Found user in responseData.data');
                }

                console.log('👤 Extracted user data:', userData);

                // Extract permissions from the role object
                if (userData?.role) {
                    const role = userData.role;
                    console.log('🎭 Role object:', role);
                    console.log('🎭 Role type:', typeof role);
                    
                    // Check if role is populated (object) or just an ID (string)
                    if (typeof role === 'string') {
                        console.warn('⚠️ Role is just an ID, not populated. Need to fetch profile.');
                        permissionsData = {
                            Employee: {},
                            Contact: {},
                            Company: {},
                            Deal: {},
                            Ticket: {},
                            Order: {},
                            Role: {},
                            Analytics: {}
                        };
                    } else {
                        // Role permissions are flat on the role object: { Employee: {read, write, delete}, Contact: {...}, etc }
                        permissionsData = {
                            Employee: role.Employee || {},
                            Contact: role.Contact || {},
                            Company: role.Company || {},
                            Deal: role.Deal || {},
                            Ticket: role.Ticket || {},
                            Order: role.Order || {},
                            Role: role.Role || {},
                            Analytics: role.Analytics || {}
                        };
                        
                        console.log('✅ Permissions extracted from role:', permissionsData);
                        console.log('📊 Analytics permissions:', permissionsData.Analytics);
                    }
                } else {
                    console.warn('⚠️ No role found in user data');
                }
                
                const newState = {
                    user: userData,
                    permissions: permissionsData,
                    isAuthenticated: !!userData,
                    isInitialized: true,
                };
                
                console.log('💾 Setting new state:', newState);
                set(() => newState);
                
                // Verify state was set
                setTimeout(() => {
                    const currentState = get();
                    console.log('✔️ State after set:', {
                        user: currentState.user?.email,
                        permissions: currentState.permissions,
                        isAuthenticated: currentState.isAuthenticated
                    });
                    console.log('📦 LocalStorage value:', localStorage.getItem('auth-storage'));
                }, 100);
                
                console.log('Final permissions stored:', permissionsData);
            },

            setInitialized: (value) => {
                set(() => ({ isInitialized: value }));
            },

            refreshPermissions: async (userId) => {
                try {
                    console.log('🔄 Refreshing permissions for user:', userId);
                    
                    // Import inside function to avoid circular dependency
                    const API = (await import('../api/client')).default;
                    const response = await API.get(`/profile/${userId}`);
                    
                    console.log('📥 Profile API response:', response.data);
                    
                    if (response.data) {
                        // Profile endpoint returns: { message, data: { profile: {...} } }
                        const userData = response.data.data?.profile || response.data.profile || response.data.data || response.data;
                        console.log('👤 User data extracted:', userData);
                        
                        const role = userData.role;
                        console.log('🎭 Role object:', role);
                        console.log('🎭 Role type:', typeof role);
                        
                        if (role && typeof role === 'object') {
                            const permissionsData = {
                                Employee: role.Employee || {},
                                Contact: role.Contact || {},
                                Company: role.Company || {},
                                Deal: role.Deal || {},
                                Ticket: role.Ticket || {},
                                Order: role.Order || {},
                                Role: role.Role || {},
                                Analytics: role.Analytics || {}
                            };
                            
                            console.log('✅ New permissions extracted:', permissionsData);
                            console.log('🔍 Analytics permission:', permissionsData.Analytics);
                            
                            // Update state
                            set((state) => {
                                const newState = {
                                    permissions: permissionsData,
                                    user: { ...state.user, ...userData, role }
                                };
                                console.log('💾 Setting new state:', newState);
                                return newState;
                            });
                            
                            // Verify state was updated
                            const currentState = get();
                            console.log('✔️ State after update:', currentState.permissions);
                            console.log('📦 LocalStorage:', localStorage.getItem('auth-storage'));
                            
                            return permissionsData;
                        } else if (typeof role === 'string') {
                            console.warn('⚠️ Role is just an ID, cannot extract permissions');
                        } else {
                            console.warn('⚠️ No role found in user data');
                        }
                    } else {
                        console.warn('⚠️ No data in response');
                    }
                } catch (error) {
                    console.error('❌ Failed to refresh permissions:', error);
                    return null;
                }
            },

            logout: () => {
                set(() => ({
                    user: null,
                    permissions: {},
                    isAuthenticated: false,
                    isInitialized: true,
                }));
                
                // Clear localStorage
                localStorage.removeItem('auth-storage');
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                permissions: state.permissions,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                console.log('🔄 Rehydrating state from localStorage');
                if (state) {
                    console.log('✅ Rehydrated state:', {
                        user: state.user?.email,
                        permissions: state.permissions,
                        isAuthenticated: state.isAuthenticated
                    });
                }
            },
        }
    )
);

export default useAuthStore;