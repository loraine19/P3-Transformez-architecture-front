// TODO: configurer les routes (login, register, dashboard via PrivateRoute)
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  // TODO: { path: '/login', element: <LoginPage /> },
  // TODO: { path: '/register', element: <RegisterPage /> },
  // TODO: { element: <PrivateRoute />, children: [{ path: '/', element: <DashboardPage /> }] },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
