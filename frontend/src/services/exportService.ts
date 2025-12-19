import { api } from './api';
import { Document } from '../../../shared/types/document';

export const exportService = {
  async getDocuments(noteId?: string): Promise<Document[]> {
    const response = await api.get<Document[]>('/export/documents', {
      params: { noteId },
    });
    return response.data;
  },

  async getDocumentById(documentId: string): Promise<Document> {
    const response = await api.get<Document>(`/export/documents/${documentId}`);
    return response.data;
  },

  async downloadDocument(
    documentId: string,
    format: 'pdf' | 'docx' | 'markdown' | 'html'
  ): Promise<void> {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const url = `${API_URL}/api/export/documents/${documentId}/download?format=${format}`;

    // Open in new window to trigger download
    window.open(url, '_blank');
  },
};
