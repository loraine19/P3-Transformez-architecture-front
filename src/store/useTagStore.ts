import { create } from 'zustand';

// TODO: state — tags[]
// TODO: actions — fetchTags(), addTag(payload)

const useTagStore = create(() => ({
  tags: [],
}));

export default useTagStore;
