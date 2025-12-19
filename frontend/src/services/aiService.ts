import { api } from './api';
import { Document, GenerateDocumentDTO } from '../../../shared/types/document';

export const aiService = {
  async transformNote(data: GenerateDocumentDTO): Promise<Document> {
    const response = await api.post<Document>('/ai/transform', data);
    return response.data;
  },

  async *transformNoteStreaming(data: GenerateDocumentDTO): AsyncGenerator<string, string, unknown> {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await fetch(`${API_URL}/api/ai/transform/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok || !response.body) {
      throw new Error('Failed to start streaming transformation');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let documentId = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            if (data.error) {
              throw new Error(data.error);
            }

            if (data.chunk) {
              yield data.chunk;
            }

            if (data.done && data.documentId) {
              documentId = data.documentId;
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return documentId;
  },
};
