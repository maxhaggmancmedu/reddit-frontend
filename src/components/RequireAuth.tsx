import { Navigate, Outlet } from "react-router-dom";
import auth from "../lib/auth";

export default function RequireAuth() {
    if (!auth.isSignedIn()) {
        return <Navigate to='/sign-in' replace />
    } 
    
    return <Outlet />
}
