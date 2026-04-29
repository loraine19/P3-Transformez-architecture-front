import apiClient from './apiClient';
import type { ApiResponse, NotePayload } from '../types/api';
import type { Note } from '../types/entities';

/* INOTE API INTERFACE */
interface INoteApi {
  fetchAll(): Promise<import('axios').AxiosResponse<ApiResponse<Note[]>>>;
  create(data: NotePayload): Promise<import('axios').AxiosResponse<ApiResponse<Note>>>;
  remove(id: number): Promise<import('axios').AxiosResponse<ApiResponse<null>>>;
}

/* NOTE API */
class NoteApi implements INoteApi {
  /* GET */
  fetchAll() {
    return apiClient.get<ApiResponse<Note[]>>('/notes');
  }

  /* CREATE */
  create(data: NotePayload) {
    return apiClient.post<ApiResponse<Note>>('/notes', data);
  }

  /* REMOVE */
  remove(id: number) {
    return apiClient.delete<ApiResponse<null>>(`/notes/${id}`);
  }
}

export const noteApi = new NoteApi();
