import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

/* ILOGIN FORM PROPS */
interface ILoginFormProps {
    onSubmit(email: string, password: string): Promise<void>;
    error: string | null;
}

/* LOGIN FORM */
export default function LoginForm({ onSubmit, error }: ILoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* SUBMIT */
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        await onSubmit(email, password);
    }

    return (
        <div className="auth-page">
            <div className="flex w-full max-w-sm flex-col gap-6">

                {/* LOGO */}
                <div className="flex flex-col items-center gap-2">
                    <span className="auth-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 42" className="size-9 fill-current text-white dark:text-zinc-800">
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif" fontSize="28">R</text>
                        </svg>
                    </span>
                </div>

                {/* HEADER */}
                <div className="flex w-full flex-col text-center">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Connexion</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Entrez vos identifiants pour vous connecter</p>
                </div>

                {/* ERROR */}
                {error && <p className="text-center text-sm text-red-600">{error}</p>}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="auth-label">Adresse email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="email@exemple.com"
                            className="auth-input"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="auth-label">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Mot de passe"
                            className="auth-input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Se connecter
                    </button>
                </form>

                {/* REGISTER LINK */}
                <div className="space-x-1 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    <span>Vous n'avez pas de compte ?</span>
                    <Link to="/register" className="font-medium text-zinc-900 hover:underline dark:text-zinc-100">Créer un compte</Link>
                </div>

            </div>
        </div>
    );
}
