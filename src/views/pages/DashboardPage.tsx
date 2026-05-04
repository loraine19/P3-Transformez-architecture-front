import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesService } from '../../services/notesService';
import { tagsService } from '../../services/tagsService';
import { authService } from '../../services/authService';
import useNoteStore from '../../store/useNoteStore';
import useTagStore from '../../store/useTagStore';
import useAuthStore from '../../store/useAuthStore';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import TagForm from '../components/TagForm';

/* DASHBOARD PAGE */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { setNotes, addNote, removeNote } = useNoteStore();
  const { setTags, addTag } = useTagStore();
  const { clearAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  /* FETCH ON MOUNT */
  useEffect(() => {
    async function init() {
      try {
        const [notes, tags] = await Promise.all([
          notesService.fetchNotes(),
          tagsService.fetchTags(),
        ]);
        setNotes(notes);
        setTags(tags);
      } catch {
        setError('Erreur chargement données.');
      }
    }
    init();
  }, []);

  /* LOGOUT */
  async function handleLogout() {
    await authService.logout();
    clearAuth();
    navigate('/login');
  }

  /* CREATE NOTE */
  async function handleCreateNote(text: string, tagId: number) {
    const note = await notesService.createNote({ text, tag_id: tagId });
    if (note) addNote(note);
  }

  /* DELETE NOTE */
  async function handleDeleteNote(id: number) {
    await notesService.deleteNote(id);
    removeNote(id);
  }

  /* CREATE TAG */
  async function handleCreateTag(name: string) {
    const tag = await tagsService.createTag({ name });
    if (tag) addTag(tag);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-800">

      {/* NAVBAR */}
      <header className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-6 py-3 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 dark:bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 42" className="size-7 fill-current text-white dark:text-zinc-800">
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif" fontSize="28">R</text>
            </svg>
          </span>
          <span className="font-semibold text-zinc-900 dark:text-white">Renote</span>
        </div>
        <button onClick={handleLogout} className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
          Déconnexion
        </button>
      </header>

      {/* CONTENT */}
      <main className="flex flex-1 flex-col gap-4 p-6">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="card">
          <NoteList onDelete={handleDeleteNote} />
          <NoteForm onSubmit={handleCreateNote} />
        </div>

        <div className="card">
          <TagForm onSubmit={handleCreateTag} />
        </div>
      </main>

    </div>
  );
}
