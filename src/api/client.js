import axios from "axios";
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4650/api/v1",
    withCredentials: true, // Important: allows cookies to be sent with requests
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

API.interceptors.request.use(
    (config) => {
        // Cookies are automatically sent with withCredentials: true
        // No need to manually attach tokens
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // If we get a 401, it could be:
        // 1. Session expired (should logout)
        // 2. Permission denied (should NOT logout, just show error)
        if (error.response?.status === 401) {
            console.log('401 Error on:', originalRequest.url);
            
            // Don't logout/redirect on auth endpoints (login, register, etc)
            const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                                   originalRequest.url?.includes('/auth/register') ||
                                   originalRequest.url?.includes('/auth/me');
            
            if (!isAuthEndpoint) {
                // Check if this is a resource endpoint (likely permission error)
                const isResourceEndpoint = originalRequest.url?.includes('/employees') ||
                                          originalRequest.url?.includes('/contacts') ||
                                          originalRequest.url?.includes('/companies') ||
                                          originalRequest.url?.includes('/deals') ||
                                          originalRequest.url?.includes('/tickets') ||
                                          originalRequest.url?.includes('/orders') ||
                                          originalRequest.url?.includes('/roles') ||
                                          originalRequest.url?.includes('/analytics');
                
                if (isResourceEndpoint) {
                    // This is likely a permission error, not auth error
                    // Don't logout, just show the error
                    console.warn('Permission denied for:', originalRequest.url);
                    toast.error('You don\'t have permission to access this resource');
                    return Promise.reject(error);
                }
                
                // For other endpoints, treat as session expired
                console.log('Session expired, logging out');
                useAuthStore.getState().logout();
                
                // Only redirect if not already on public pages
                if (!window.location.pathname.includes('/login') && 
                    !window.location.pathname.includes('/signup') &&
                    !window.location.pathname.includes('/onboarding') &&
                    !window.location.pathname.includes('/forgot-password') &&
                    !window.location.pathname.includes('/reset-password')) {
                    console.log('Redirecting to login...');
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default API;