import useAuthStore from '../../store/authStore';

/**
 * PermissionGuard - Component-level permission checker
 * Hides children if user doesn't have required permissions
 * 
 * @param {Array} permission - Array of {resource, action} objects. REQUIRED - items without permission will be hidden
 * @param {boolean} any - If true, user needs ANY of the permissions. If false, user needs ALL permissions
 * @param {ReactNode} children - Content to conditionally render
 */
const PermissionGuard = ({ permission, children, any = false }) => {
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // If user is not authenticated, don't render
    if (!isAuthenticated) return null;

    // If no permission specified, DON'T render (permission is required)
    // This ensures items without permission are hidden
    if (!permission || !Array.isArray(permission) || permission.length === 0) {
        return null;
    }

    // If permissions object doesn't exist or is invalid, don't render
    if (!permissions || typeof permissions !== 'object') {
        console.log('PermissionGuard: No permissions object found');
        return null;
    }

    // Check if user has required permissions
    // any=true: user needs at least one permission
    // any=false: user needs all permissions
    const allowed = any
        ? permission.some(({ resource, action }) => {
            const hasAccess = permissions[resource]?.[action] === true;
            console.log(`PermissionGuard (ANY): Checking ${resource}.${action} = ${hasAccess}`);
            return hasAccess;
          })
        : permission.every(({ resource, action }) => {
            const hasAccess = permissions[resource]?.[action] === true;
            console.log(`PermissionGuard (ALL): Checking ${resource}.${action} = ${hasAccess}`);
            return hasAccess;
          });

    console.log(`PermissionGuard: Final result = ${allowed}`, { permission, permissions });

    // Only render if user has required permissions
    return allowed ? children : null;
};

export default PermissionGuard;
