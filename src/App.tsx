import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// TODO: { path: '/login', element: <LoginPage /> }
// TODO: { path: '/register', element: <RegisterPage /> }
// TODO: { element: <PrivateRoute />, children: [{ path: '/', element: <DashboardPage /> }] }

const router = createBrowserRouter([]);

export default function App() {
  return <RouterProvider router={router} />;
}
