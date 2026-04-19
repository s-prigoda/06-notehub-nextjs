import axios, { type AxiosResponse } from 'axios';
import type { Note } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type CreateNoteData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

const noteInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await noteInstance.get(
    '/notes',
    {
      params: { page, perPage, search },
    }
  );
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteInstance.post(
    '/notes',
    noteData
  );
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteInstance.delete(
    `/notes/${noteId}`
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteInstance.get(`/notes/${id}`);
  return response.data;
};
