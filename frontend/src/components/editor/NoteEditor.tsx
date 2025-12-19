import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useNote, useUpdateNote, useDeleteNote } from '../../hooks/useNotes';
import { useTemplates } from '../../hooks/useTemplates';
import { useAutoSave } from '../../hooks/useAutoSave';
import { MeetingType } from '../../../../shared/types/note';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { AITransformPanel } from '../ai/AITransformPanel';

export const NoteEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: note, isLoading } = useNote(id!);
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote } = useDeleteNote();
  const { data: templates } = useTemplates({ isActive: true });

  const [title, setTitle] = useState('');
  const [meetingType, setMeetingType] = useState<MeetingType>('general');
  const [showAIPanel, setShowAIPanel] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start taking notes...',
      }),
    ],
    content: '',
  });

  useEffect(() => {
    if (note && editor) {
      setTitle(note.title);
      setMeetingType(note.meetingType as MeetingType);
      editor.commands.setContent(note.content || '');
    }
  }, [note, editor]);

  // Auto-save
  useAutoSave(id!, editor?.getHTML() || '', title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleMeetingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as MeetingType;
    setMeetingType(newType);
    if (id) {
      updateNote({ id, data: { meetingType: newType } });
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id!, {
        onSuccess: () => {
          navigate('/notes');
        },
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!note) return <div>Note not found</div>;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="glass rounded-2xl shadow-soft p-8 border border-white border-opacity-40">
        <div className="flex items-center justify-between mb-8">
          <Button variant="secondary" onClick={() => navigate('/notes')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Notes
          </Button>

          <div className="flex gap-3">
            <Button onClick={() => setShowAIPanel(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Transform with AI
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </Button>
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className="w-full text-4xl font-bold border-none outline-none mb-6 bg-transparent text-dark-900 placeholder-dark-300 focus:ring-2 focus:ring-primary-400 focus:ring-opacity-30 rounded-lg px-2 py-1 transition-all"
        />

        <div className="mb-6">
          <label className="block text-sm font-semibold text-dark-700 mb-3">
            Meeting Type
          </label>
          <select
            value={meetingType}
            onChange={handleMeetingTypeChange}
            className="px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 cursor-pointer hover:shadow-md"
          >
            <option value="development">Development</option>
            <option value="technical">Technical</option>
            <option value="general">General</option>
            <option value="doctor-patient">Doctor-Patient</option>
          </select>
        </div>

        <div className="glass rounded-xl shadow-inner-soft border border-dark-100 overflow-hidden">
          <EditorContent editor={editor} />
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-dark-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Last saved: {new Date(note.updatedAt).toLocaleString()}
        </div>
      </div>

      {showAIPanel && (
        <AITransformPanel
          noteId={id!}
          noteContent={editor?.getHTML() || ''}
          templates={templates || []}
          onClose={() => setShowAIPanel(false)}
        />
      )}
    </div>
  );
};
