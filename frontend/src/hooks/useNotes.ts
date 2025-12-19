import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesService } from '../services/notesService';
import { CreateNoteDTO, UpdateNoteDTO } from '../../../shared/types/note';

export const useNotes = (filters?: { meetingType?: string; search?: string }) => {
  return useQuery({
    queryKey: ['notes', filters],
    queryFn: () => notesService.getNotes(filters),
  });
};

export const useNote = (noteId: string) => {
  return useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesService.getNoteById(noteId),
    enabled: !!noteId,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoteDTO) => notesService.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNoteDTO }) =>
      notesService.updateNote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', variables.id] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notesService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
