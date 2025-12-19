import { useQuery } from '@tanstack/react-query';
import { exportService } from '../services/exportService';

export const useDocuments = (noteId?: string) => {
  return useQuery({
    queryKey: ['documents', noteId],
    queryFn: () => exportService.getDocuments(noteId),
  });
};

export const useDocument = (documentId: string) => {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: () => exportService.getDocumentById(documentId),
    enabled: !!documentId,
  });
};
