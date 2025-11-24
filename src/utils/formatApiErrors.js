export function formatApiErrors(errorResponse) {
    if (!errorResponse) return [];

    // If errorResponse is an Axios error, get the actual response data
    const data = errorResponse?.response?.data || errorResponse;

    // If error array exists, map it to messages
    if (Array.isArray(data.error)) {
        return data.error.map(e => ({
            field: e.path?.[0] || null,
            message: e.message || data.message || 'Unknown error',
            code: e.code,
            origin: e.origin,
            ...e,
        }));
    }

    // Fallback: single message
    return [{
        field: null,
        message: data.message || 'Unknown error',
    }];
}