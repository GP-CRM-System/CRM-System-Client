import useAuthStore from '../../store/authStore';

/**
 * PermissionGuard - Component-level permission checker
 * Hides children if user doesn't have required permissions
 * 
 * Usage examples:
 * - String format: <PermissionGuard permission="Contact.write">
 * - Array of strings: <PermissionGuard permission={["Contact.write", "Contact.delete"]} any>
 * - Object format: <PermissionGuard permission={[{resource: 'Contact', action: 'write'}]}>
 * 
 * @param {string|Array<string>|Array<{resource, action}>} permission - Permission(s) to check
 * @param {boolean} any - If true, user needs ANY of the permissions. If false, user needs ALL permissions
 * @param {ReactNode} children - Content to conditionally render
 */
const PermissionGuard = ({ permission, children, any = false }) => {
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // If user is not authenticated, don't render
    if (!isAuthenticated) return null;

    // If no permission specified, DON'T render
    if (!permission) return null;

    // If permissions object doesn't exist or is invalid, don't render
    if (!permissions || typeof permissions !== 'object') {
        return null;
    }

    // Normalize permission to array of {resource, action}
    let permissionsToCheck = [];
    
    if (typeof permission === 'string') {
        // Single string: "Contact.write"
        const [resource, action] = permission.split('.');
        permissionsToCheck = [{ resource, action }];
    } else if (Array.isArray(permission)) {
        if (permission.length === 0) return null;
        
        // Check if array contains strings or objects
        if (typeof permission[0] === 'string') {
            // Array of strings: ["Contact.write", "Contact.delete"]
            permissionsToCheck = permission.map(perm => {
                const [resource, action] = perm.split('.');
                return { resource, action };
            });
        } else {
            // Array of objects: [{resource: 'Contact', action: 'write'}]
            permissionsToCheck = permission;
        }
    } else {
        return null;
    }

    // Check if user has required permissions
    const allowed = any
        ? permissionsToCheck.some(({ resource, action }) => 
            permissions[resource]?.[action] === true
        )
        : permissionsToCheck.every(({ resource, action }) => 
            permissions[resource]?.[action] === true
        );

    // Only render if user has required permissions
    return allowed ? children : null;
};

export default PermissionGuard;
