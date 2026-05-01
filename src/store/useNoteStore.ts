import { create } from 'zustand';
import { notesService } from '../services/notesService';
import type { Note } from '../types/entities';
import type { NotePayload } from '../types/api';

/* INOTE STORE STATE */
interface INoteState {
  notes: Note[];
}

/* INOTE STORE ACTIONS */
interface INoteActions {
  fetchNotes(): Promise<void>;
  addNote(data: NotePayload): Promise<void>;
  removeNote(id: number): Promise<void>;
}

/* NOTE STORE */
const useNoteStore = create<INoteState & INoteActions>((set) => ({
  notes: [],

  /* FETCH NOTES */
  fetchNotes: async (): Promise<void> => {
    const notes: Note[] = await notesService.fetchNotes();
    set({ notes });
  },

  /* ADD NOTE */
  addNote: async (data: NotePayload): Promise<void> => {
    const note: Note | null = await notesService.createNote(data);
    if (note) set((s) => ({ notes: [...s.notes, note] }));
  },

  /* REMOVE NOTE */
  removeNote: async (id: number): Promise<void> => {
    await notesService.deleteNote(id);
    set((s) => ({ notes: s.notes.filter((n) => n.id !== id) }));
  },
}));

export default useNoteStore;
