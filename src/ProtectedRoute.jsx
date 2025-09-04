import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            return <Navigate to="/login" replace />;
        }
    } catch (err) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
