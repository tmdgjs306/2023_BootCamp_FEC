import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";

export const ProtectedRoute = () => {
    const { token } = useAuth();

    // user is authenticated?
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};