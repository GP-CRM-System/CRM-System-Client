import useAuthStore from '../../store/authStore';
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute: Ensures user is authenticated and has required permissions
 * @param {object} children - Child components to render
 * @param {array} requiredPermissions - Array of {resource, action} objects
 * Example: [{resource: "Company", action: "read"}]
 */
export default function ProtectedRoute({ children, requiredPermissions = [] }) {
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // First check: User must be authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Second check: If permissions are required, validate them
    if (requiredPermissions && requiredPermissions.length > 0) {
        // Ensure permissions object exists
        if (!permissions || typeof permissions !== 'object') {
            return <Navigate to="/unauthorized" replace />;
        }

        // Check if user has all required permissions
        const hasAllPermissions = requiredPermissions.every(({ resource, action }) => {
            return permissions[resource]?.[action] === true;
        });

        if (!hasAllPermissions) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
}
