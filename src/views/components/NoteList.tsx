import useNoteStore from '../../store/useNoteStore';
import useTagStore from '../../store/useTagStore';
import type { Note } from '../../types/entities';

/* INOTE LIST PROPS */
interface INoteListProps {
  onDelete(id: number): Promise<void>;
}

/* NOTE ITEM */
function NoteItem({ note, onDelete }: { note: Note; onDelete(id: number): Promise<void> }) {
  const { tags } = useTagStore();
  const tag = tags.find((t) => t.id === note.tag_id);

  return (
    <div className="flex items-start justify-between border-b border-neutral-100 py-3 last:border-0 dark:border-neutral-800">
      <div>
        <p className="text-sm text-zinc-900 dark:text-white">{note.text}</p>
        <small className="text-zinc-500">Tag : {tag?.name ?? '—'}</small>
      </div>
      <button onClick={() => onDelete(note.id)} className="btn-danger">Supprimer</button>
    </div>
  );
}

/* NOTE LIST */
export default function NoteList({ onDelete }: INoteListProps) {
  const { notes } = useNoteStore();

  if (notes.length === 0) return <p className="text-sm text-zinc-500">Aucune note.</p>;

  return (
    <div className="space-y-1">
      <h2 className="section-title mb-2">Vos notes</h2>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}
