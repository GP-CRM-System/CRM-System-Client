import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// PublicRoute: prevents authenticated users from visiting public pages
export default function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    // While auth status is being determined, render children to avoid flicker.
    // If you prefer a spinner, replace `children` with a loader when loading===true.
    if (loading) return children;

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
