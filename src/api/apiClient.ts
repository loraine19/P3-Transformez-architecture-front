import axios from 'axios';
import { tokenStorage } from './tokenStorage';

// axios instance configured with base URL from env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

/* REQUEST INTERCEPTOR */
// attach Bearer token before each request
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* RESPONSE INTERCEPTOR */
// 401 → clear token and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const status = axios.isAxiosError(error) ? error.response?.status : null;
    if (status === 401) {
      tokenStorage.remove();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
