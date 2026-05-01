import { create } from 'zustand';
import { tagsService } from '../services/tagsService';
import type { Tag } from '../types/entities';
import type { TagPayload } from '../types/api';

/* ITAG STORE STATE */
interface ITagState {
  tags: Tag[];
}

/* ITAG STORE ACTIONS */
interface ITagActions {
  fetchTags(): Promise<void>;
  addTag(data: TagPayload): Promise<void>;
}

/* TAG STORE */
const useTagStore = create<ITagState & ITagActions>((set) => ({
  tags: [],

  /* FETCH TAGS */
  fetchTags: async (): Promise<void> => {
    const tags: Tag[] = await tagsService.fetchTags();
    set({ tags });
  },

  /* ADD TAG */
  addTag: async (data: TagPayload): Promise<void> => {
    const tag: Tag | null = await tagsService.createTag(data);
    if (tag) set((s) => ({ tags: [...s.tags, tag] }));
  },
}));

export default useTagStore;
