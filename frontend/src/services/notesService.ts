import { api } from './api';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../../shared/types/note';

export const notesService = {
  async createNote(data: CreateNoteDTO): Promise<Note> {
    const response = await api.post<Note>('/notes', data);
    return response.data;
  },

  async getNotes(filters?: { meetingType?: string; search?: string }): Promise<Note[]> {
    const response = await api.get<Note[]>('/notes', { params: filters });
    return response.data;
  },

  async getNoteById(id: string): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  async updateNote(id: string, data: UpdateNoteDTO): Promise<Note> {
    const response = await api.put<Note>(`/notes/${id}`, data);
    return response.data;
  },

  async deleteNote(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
  },
};
