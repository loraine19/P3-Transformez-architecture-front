import { tagApi } from '../api/tagApi';
import type { TagPayload } from '../types/api';
import type { Tag } from '../types/entities';

/* ITAGS SERVICE INTERFACE */
interface ITagsService {
  fetchTags(): Promise<Tag[] | null>;
  createTag(data: TagPayload): Promise<Tag | null>;
}

/* TAGS SERVICE */
class TagsService implements ITagsService {
  /* FETCH TAGS */
  async fetchTags() {
    const res = await tagApi.fetchAll();
    return res.data.data;
  }

  /* CREATE TAG */
  async createTag(data: TagPayload) {
    const res = await tagApi.create(data);
    return res.data.data;
  }
}

export const tagsService = new TagsService();
