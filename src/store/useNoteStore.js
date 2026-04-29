import { create } from 'zustand';

// TODO: state: { notes: [] }
// TODO: actions: fetchNotes(), addNote(payload), deleteNote(id)

const useNoteStore = create(() => ({
    notes: [],
}));

export default useNoteStore;
