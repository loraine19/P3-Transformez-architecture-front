import { RouterProvider } from 'react-router-dom';
import router from './router/router';

/* APP */
export default function App() {
  return <RouterProvider router={router} />;
}
