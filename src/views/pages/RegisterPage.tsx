import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import RegisterForm from '../components/RegisterForm';

/* REGISTER PAGE */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  /* SUBMIT */
  async function handleSubmit(name: string, email: string, password: string) {
    setError(null);
    try {
      await authService.register({ name, email, password });
      navigate('/login');
    } catch {
      setError("Erreur lors de l'inscription.");
    }
  }

  return <RegisterForm onSubmit={handleSubmit} error={error} />;
}
