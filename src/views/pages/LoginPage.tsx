import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import useAuthStore from '../../store/useAuthStore';
import LoginForm from '../components/LoginForm';

/* LOGIN PAGE */
export default function LoginPage() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  /* SUBMIT */
  async function handleSubmit(email: string, password: string) {
    setError(null);
    try {
      const data = await authService.login({ email, password });
      if (data) { setAuth(data); navigate('/'); }
    } catch {
      setError('Identifiants invalides.');
    }
  }

  return <LoginForm onSubmit={handleSubmit} error={error} />;
}
