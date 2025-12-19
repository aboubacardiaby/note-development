import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes, useCreateNote } from '../../hooks/useNotes';
import { MeetingType } from '../../../../shared/types/note';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const NotesList = () => {
  const [meetingType, setMeetingType] = useState<MeetingType | ''>('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data: notes, isLoading } = useNotes({
    meetingType: meetingType || undefined,
    search: search || undefined,
  });

  const { mutate: createNote } = useCreateNote();

  const handleCreateNote = () => {
    createNote(
      {
        title: 'Untitled Note',
        content: '',
        meetingType: 'general',
      },
      {
        onSuccess: (note) => {
          navigate(`/notes/${note.id}`);
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-dark-900 mb-1">My Notes</h1>
          <p className="text-dark-500">Organize and transform your meeting notes with AI</p>
        </div>
        <Button onClick={handleCreateNote}>+ New Note</Button>
      </div>

      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 placeholder-dark-400"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <select
          value={meetingType}
          onChange={(e) => setMeetingType(e.target.value as MeetingType | '')}
          className="px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 cursor-pointer hover:shadow-md"
        >
          <option value="">All Types</option>
          <option value="development">Development</option>
          <option value="technical">Technical</option>
          <option value="general">General</option>
          <option value="doctor-patient">Doctor-Patient</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes?.map((note, index) => (
          <div
            key={note.id}
            onClick={() => navigate(`/notes/${note.id}`)}
            className="glass p-6 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer border border-white border-opacity-40 hover-lift group animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-dark-900 group-hover:text-primary-600 transition-colors line-clamp-2">{note.title}</h3>
            </div>
            <p className="text-sm text-dark-500 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(note.updatedAt).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 border border-primary-200">
                {note.meetingType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {notes?.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="glass rounded-2xl p-12 max-w-md mx-auto shadow-soft">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-dark-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-dark-600 text-lg mb-6 font-medium">No notes found</p>
            <Button onClick={handleCreateNote}>Create your first note</Button>
          </div>
        </div>
      )}
    </div>
  );
};
