import { useEffect, useRef } from 'react';
import { useUpdateNote } from './useNotes';

export const useAutoSave = (noteId: string, content: string, title: string) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { mutate: updateNote } = useUpdateNote();

  useEffect(() => {
    if (!noteId) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateNote({ id: noteId, data: { content, title } });
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, title, noteId, updateNote]);
};
