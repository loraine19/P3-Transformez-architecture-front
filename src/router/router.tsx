import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../views/pages/LoginPage';
import RegisterPage from '../views/pages/RegisterPage';
import DashboardPage from '../views/pages/DashboardPage';
import PrivateRoute from './PrivateRoute';

/* ROUTER */
const router = createBrowserRouter([
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    {
        element: <PrivateRoute />,
        children: [{ path: '/', element: <DashboardPage /> }],
    },
]);

export default router;
