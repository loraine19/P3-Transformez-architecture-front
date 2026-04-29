import { noteApi } from '../api/noteApi';
import type { NotePayload } from '../types/api';
import type { Note } from '../types/entities';

/* INOTES SERVICE INTERFACE */
interface INotesService {
  fetchNotes(): Promise<Note[] | null>;
  createNote(data: NotePayload): Promise<Note | null>;
  deleteNote(id: number): Promise<void>;
}

/* NOTES SERVICE */
class NotesService implements INotesService {
  /* FETCH NOTES */
  async fetchNotes() {
    const res = await noteApi.fetchAll();
    return res.data.data;
  }

  /* CREATE NOTE */
  async createNote(data: NotePayload) {
    const res = await noteApi.create(data);
    return res.data.data;
  }

  /* DELETE NOTE */
  async deleteNote(id: number) {
    await noteApi.remove(id);
  }
}

export const notesService = new NotesService();
