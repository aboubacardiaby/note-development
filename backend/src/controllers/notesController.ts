import { Request, Response } from 'express';
import notesService from '../services/notesService';
import { CreateNoteDTO, UpdateNoteDTO } from '../../../shared/types/note';
import logger from '../utils/logger';

export const createNote = async (req: Request, res: Response) => {
  try {
    const data: CreateNoteDTO = req.body;
    logger.info('Creating note', { meetingType: data.meetingType, titleLength: data.title?.length });

    const note = await notesService.createNote(data);

    logger.info('Note created successfully', { noteId: note.id, meetingType: note.meetingType });
    res.status(201).json(note);
  } catch (error) {
    logger.error('Create note error', { error, body: req.body });
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const { meetingType, search } = req.query;
    logger.debug('Fetching notes', { meetingType, search });

    const notes = await notesService.getNotes({
      meetingType: meetingType as string,
      search: search as string,
    });

    logger.info('Notes fetched successfully', { count: notes.length, meetingType, search });
    res.json(notes);
  } catch (error) {
    logger.error('Get notes error', { error, query: req.query });
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.debug('Fetching note by ID', { noteId: id });

    const note = await notesService.getNoteById(id);

    if (!note) {
      logger.warn('Note not found', { noteId: id });
      return res.status(404).json({ error: 'Note not found' });
    }

    logger.info('Note fetched successfully', { noteId: id });
    res.json(note);
  } catch (error) {
    logger.error('Get note error', { error, noteId: req.params.id });
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateNoteDTO = req.body;
    logger.info('Updating note', { noteId: id, fields: Object.keys(data) });

    const note = await notesService.updateNote(id, data);

    logger.info('Note updated successfully', { noteId: id });
    res.json(note);
  } catch (error) {
    logger.error('Update note error', { error, noteId: req.params.id, body: req.body });
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info('Deleting note', { noteId: id });

    await notesService.deleteNote(id);

    logger.info('Note deleted successfully', { noteId: id });
    res.status(204).send();
  } catch (error) {
    logger.error('Delete note error', { error, noteId: req.params.id });
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
