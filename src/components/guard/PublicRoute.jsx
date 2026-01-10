import useAuthStore from '../../store/authStore';
import { Navigate, useLocation } from "react-router-dom";

/**
 * PublicRoute: Prevents authenticated users from accessing public pages (login, register)
 * Redirects authenticated users to the dashboard
 */
export default function PublicRoute({ children }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const loading = useAuthStore((state) => state.loading);
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    // While checking auth status, render children to avoid flicker
    if (loading) return children;

    // If user is already authenticated
    if (isAuthenticated) {
        // If trying to access onboarding routes but already has a company, go to dashboard
        if (location.pathname.includes('/onboarding') && user?.company) {
            return <Navigate to="/dashboard/home" replace />;
        }
        
        // If trying to access login/signup but authenticated, go to dashboard
        if (location.pathname === '/login' || location.pathname === '/signup') {
            return <Navigate to="/dashboard/home" replace />;
        }
        
        // Allow access to onboarding routes if no company yet
        if (location.pathname.includes('/onboarding') && !user?.company) {
            return children;
        }
        
        // Default: redirect to dashboard
        return <Navigate to="/dashboard/home" replace />;
    }

    return children;
}
