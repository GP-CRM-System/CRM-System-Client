export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        REFRESH: "/auth/refresh",
        ME: "/auth/me",
        LOGOUT: "/auth/logout",
    },
    COMPANY: {
        CREATE: "/companies",
        GETALL: "/companies",
        GETone: (id) => `/companies/${id}`,
        UPDATE: (id) => `/companies/${id}`,
        DELETE: (id) => `/companies/${id}`
    }
};
