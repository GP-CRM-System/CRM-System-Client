import useAuthStore from '../../store/authStore';
import { Navigate } from "react-router-dom";

/**
 * PublicRoute: Prevents authenticated users from accessing public pages (login, register)
 * Redirects authenticated users to the dashboard
 */
export default function PublicRoute({ children }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const loading = useAuthStore((state) => state.loading);

    // While checking auth status, render children to avoid flicker
    if (loading) return children;

    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
