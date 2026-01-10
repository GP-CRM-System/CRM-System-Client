import useAuthStore from '../../store/authStore';

// UI-level permission guard - only hides/shows UI elements (sidebar items, buttons, etc.)
// Does NOT prevent route access - use RoutePermissionGuard for routes
const PermissionGuard = ({ permission, children, any = false }) => {
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) return null;
    if (!permission) return children;
    if (!permissions || typeof permissions !== 'object') return null;

    let permissionsToCheck = [];
    
    if (typeof permission === 'string') {
        const [resource, action] = permission.split('.');
        permissionsToCheck = [{ resource, action }];
    } else if (Array.isArray(permission)) {
        if (permission.length === 0) return null;
        if (typeof permission[0] === 'string') {
            permissionsToCheck = permission.map(perm => {
                const [resource, action] = perm.split('.');
                return { resource, action };
            });
        } else {
            permissionsToCheck = permission;
        }
    } else {
        return null;
    }

    const allowed = any
        ? permissionsToCheck.some(({ resource, action }) => 
            permissions[resource]?.[action] === true
        )
        : permissionsToCheck.every(({ resource, action }) => 
            permissions[resource]?.[action] === true
        );

    return allowed ? children : null;
};

export default PermissionGuard;
