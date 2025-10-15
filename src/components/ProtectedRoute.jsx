import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredPermissions = [] }) {
    const { permissions, isAuthenticated } = useSelector((state) => state.auth);

    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoute - user permissions:", permissions);
    console.log("ProtectedRoute - requiredPermissions:", requiredPermissions);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
        const ok = requiredPermissions.every(p => permissions.includes(p));
        if (!ok) return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
