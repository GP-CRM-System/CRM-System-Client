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
        GetAll: "/companies",
        GetOne: (id) => `/companies/${id}`,
        UPDATE: (id) => `/companies/${id}`,
        DELETE: (id) => `/companies/${id}`
    },
    CONTACT: {
        CREATE: "/contacts",
        GetAll: "/contacts",
        GetOne: (id) => `/contacts/${id}`,
        UPDATE: (id) => `/contacts/${id}`,
        DELETE: (id) => `/contacts/${id}`
    },
    EMPLOYEE:{
        GetAll: "/employees",
        GetOne: (id) => `/employees/${id}`
    }
};
