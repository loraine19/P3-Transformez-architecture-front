import apiClient from './apiClient';
import type { ApiResponse, TagPayload } from '../types/api';
import type { Tag } from '../types/entities';

/* ITAG API INTERFACE */
interface ITagApi {
  fetchAll(): Promise<import('axios').AxiosResponse<ApiResponse<Tag[]>>>;
  create(data: TagPayload): Promise<import('axios').AxiosResponse<ApiResponse<Tag>>>;
}

/* TAG API */
class TagApi implements ITagApi {
  /* GET */
  fetchAll() {
    return apiClient.get<ApiResponse<Tag[]>>('/tags');
  }

  /* CREATE */
  create(data: TagPayload) {
    return apiClient.post<ApiResponse<Tag>>('/tags', data);
  }
}

export const tagApi = new TagApi();
