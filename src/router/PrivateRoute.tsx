import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

/* PRIVATE ROUTE */
export default function PrivateRoute() {
    const token = useAuthStore((s) => s.token);
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}
