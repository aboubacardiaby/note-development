import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService } from '../services/aiService';
import { GenerateDocumentDTO } from '../../../shared/types/document';

export const useAITransform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateDocumentDTO) => aiService.transformNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const useAITransformStreaming = () => {
  const [streamedContent, setStreamedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const startStreaming = async (data: GenerateDocumentDTO) => {
    setIsStreaming(true);
    setStreamedContent('');
    setError(null);
    setDocumentId(null);

    try {
      for await (const chunk of aiService.transformNoteStreaming(data)) {
        setStreamedContent((prev) => prev + chunk);
      }

      const finalDocumentId = await aiService.transformNoteStreaming(data).return!('');
      setDocumentId(finalDocumentId.value);
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsStreaming(false);
    }
  };

  const reset = () => {
    setStreamedContent('');
    setError(null);
    setDocumentId(null);
    setIsStreaming(false);
  };

  return {
    streamedContent,
    isStreaming,
    error,
    documentId,
    startStreaming,
    reset,
  };
};
