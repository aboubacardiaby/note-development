import { Request, Response } from 'express';
import aiService from '../services/aiService';
import notesService from '../services/notesService';
import templatesService from '../services/templatesService';
import { prisma } from '../config/database';
import { config } from '../config/env';
import logger from '../utils/logger';

export const transformNote = async (req: Request, res: Response) => {
  try {
    const { noteId, templateId, additionalContext } = req.body;
    logger.info('Starting note transformation', { noteId, templateId, hasAdditionalContext: !!additionalContext });

    const [note, template] = await Promise.all([
      notesService.getNoteById(noteId),
      templatesService.getTemplateById(templateId)
    ]);

    if (!note) {
      logger.warn('Note not found for transformation', { noteId });
      return res.status(404).json({ error: 'Note not found' });
    }

    if (!template) {
      logger.warn('Template not found for transformation', { templateId });
      return res.status(404).json({ error: 'Template not found' });
    }

    logger.info('Calling AI service for transformation', {
      noteId,
      templateId,
      templateName: template.name,
      contentLength: note.content.length,
    });

    const { content, tokensUsed } = await aiService.transformNote(
      note.content,
      template,
      additionalContext
    );

    logger.info('AI transformation completed', {
      noteId,
      templateId,
      tokensUsed,
      outputLength: content.length,
    });

    const document = await prisma.document.create({
      data: {
        title: `${note.title} - ${template.name}`,
        content,
        format: template.outputFormat,
        noteId,
        templateId,
        aiModel: config.aiModel,
        tokensUsed,
      }
    });

    logger.info('Document created from transformation', {
      documentId: document.id,
      noteId,
      templateId,
      tokensUsed,
    });

    res.json(document);
  } catch (error) {
    logger.error('Transform note error', { error, body: req.body });
    res.status(500).json({ error: 'Failed to transform note' });
  }
};

export const transformNoteStreaming = async (req: Request, res: Response) => {
  try {
    const { noteId, templateId, additionalContext } = req.body;
    logger.info('Starting streaming note transformation', { noteId, templateId, hasAdditionalContext: !!additionalContext });

    const [note, template] = await Promise.all([
      notesService.getNoteById(noteId),
      templatesService.getTemplateById(templateId)
    ]);

    if (!note) {
      logger.warn('Note not found for streaming transformation', { noteId });
      return res.status(404).json({ error: 'Note not found' });
    }

    if (!template) {
      logger.warn('Template not found for streaming transformation', { templateId });
      return res.status(404).json({ error: 'Template not found' });
    }

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    logger.info('Starting AI streaming', {
      noteId,
      templateId,
      templateName: template.name,
      contentLength: note.content.length,
    });

    let fullContent = '';
    let chunkCount = 0;

    try {
      // Stream the transformation
      for await (const chunk of aiService.transformNoteStreaming(
        note.content,
        template,
        additionalContext
      )) {
        fullContent += chunk;
        chunkCount++;
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }

      logger.info('AI streaming completed', {
        noteId,
        templateId,
        chunkCount,
        outputLength: fullContent.length,
      });

      // Save the document after streaming completes
      const document = await prisma.document.create({
        data: {
          title: `${note.title} - ${template.name}`,
          content: fullContent,
          format: template.outputFormat,
          noteId,
          templateId,
          aiModel: config.aiModel,
        }
      });

      logger.info('Document created from streaming transformation', {
        documentId: document.id,
        noteId,
        templateId,
        chunkCount,
      });

      res.write(`data: ${JSON.stringify({ done: true, documentId: document.id })}\n\n`);
      res.end();
    } catch (streamError) {
      logger.error('Streaming transformation error', {
        error: streamError,
        noteId,
        templateId,
        chunkCount,
        partialContentLength: fullContent.length,
      });
      res.write(`data: ${JSON.stringify({ error: 'Transformation failed' })}\n\n`);
      res.end();
    }
  } catch (error) {
    logger.error('Transform note streaming initialization error', { error, body: req.body });
    res.status(500).json({ error: 'Failed to start transformation' });
  }
};
