import { useState, type FormEvent } from 'react';
import useTagStore from '../../store/useTagStore';

/* INOTE FORM PROPS */
interface INoteFormProps {
  onSubmit(text: string, tagId: number): Promise<void>;
}

/* NOTE FORM */
export default function NoteForm({ onSubmit }: INoteFormProps) {
  const { tags } = useTagStore();
  const [text, setText] = useState('');
  const [tagId, setTagId] = useState<number>(0);

  /* SUBMIT */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSubmit(text, tagId);
    setText('');
    setTagId(0);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrire une note..."
        required
        className="w-full rounded-md border border-zinc-300 bg-white p-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
      />
      <select
        value={tagId}
        onChange={(e) => setTagId(Number(e.target.value))}
        className="auth-input"
      >
        <option value={0}>-- Sélectionner un tag --</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>
      <button type="submit" className="btn-primary">Ajouter une note</button>
    </form>
  );
}
