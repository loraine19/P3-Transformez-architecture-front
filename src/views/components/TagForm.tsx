import { useState, type FormEvent } from 'react';

/* ITAG FORM PROPS */
interface ITagFormProps {
  onSubmit(name: string): Promise<void>;
}

/* TAG FORM */
export default function TagForm({ onSubmit }: ITagFormProps) {
  const [name, setName] = useState('');

  /* SUBMIT */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSubmit(name);
    setName('');
  }

  return (
    <div className="space-y-2">
      <h2 className="section-title">Ajouter un tag</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du tag"
          required
          className="auth-input"
        />
        <button type="submit" className="btn-primary">Ajouter</button>
      </form>
    </div>
  );
}
