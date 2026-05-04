import { create } from 'zustand';
import type { Note } from '../types/entities';

/* INOTE STATE */
interface INoteState {
  notes: Note[];
}

/* INOTE ACTIONS */
interface INoteActions {
  setNotes(notes: Note[]): void;
  addNote(note: Note): void;
  removeNote(id: number): void;
}

/* NOTE STORE */
const useNoteStore = create<INoteState & INoteActions>((set) => ({
  notes: [],

  /* SET NOTES */
  setNotes: (notes) => set({ notes }),

  /* ADD NOTE */
  addNote: (note) => set((s) => ({ notes: [...s.notes, note] })),

  /* REMOVE NOTE */
  removeNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
}));

export default useNoteStore;
