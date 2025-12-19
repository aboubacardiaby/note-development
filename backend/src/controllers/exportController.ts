import { Request, Response } from 'express';
import { prisma } from '../config/database';
import exportService from '../services/exportService';

export const exportDocument = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;
    const { format } = req.query as { format: 'pdf' | 'docx' | 'markdown' | 'html' };

    if (!format || !['pdf', 'docx', 'markdown', 'html'].includes(format)) {
      return res.status(400).json({ error: 'Invalid or missing format parameter' });
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    let fileBuffer: Buffer | string;
    let contentType: string;
    let filename: string;

    switch (format) {
      case 'pdf':
        fileBuffer = await exportService.exportToPDF(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        contentType = 'application/pdf';
        filename = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
        break;

      case 'docx':
        fileBuffer = await exportService.exportToDOCX(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        filename = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx`;
        break;

      case 'markdown':
        fileBuffer = await exportService.exportToMarkdown(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        contentType = 'text/markdown';
        filename = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
        break;

      case 'html':
        fileBuffer = await exportService.exportToHTML(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        contentType = 'text/html';
        filename = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
        break;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(fileBuffer);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed' });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.query;
    const where = noteId ? { noteId: noteId as string } : {};

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        note: {
          select: {
            id: true,
            title: true,
          }
        },
        template: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    res.json(documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        note: true,
        template: true,
      }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
};
