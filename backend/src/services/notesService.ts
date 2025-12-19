import { prisma } from '../config/database';
import { CreateNoteDTO, UpdateNoteDTO, Note } from '../../../shared/types/note';

class NotesService {
  async createNote(data: CreateNoteDTO): Promise<Note> {
    return prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        meetingType: data.meetingType,
      }
    });
  }

  async getNotes(filters?: {
    meetingType?: string;
    search?: string;
  }): Promise<Note[]> {
    const where: any = {};

    if (filters?.meetingType) {
      where.meetingType = filters.meetingType;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { content: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    return prisma.note.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        documents: {
          select: {
            id: true,
            title: true,
            createdAt: true,
          }
        }
      }
    });
  }

  async getNoteById(id: string): Promise<Note | null> {
    return prisma.note.findUnique({
      where: { id },
      include: {
        documents: true
      }
    });
  }

  async updateNote(id: string, data: UpdateNoteDTO): Promise<Note> {
    return prisma.note.update({
      where: { id },
      data
    });
  }

  async deleteNote(id: string): Promise<void> {
    await prisma.note.delete({ where: { id } });
  }
}

export default new NotesService();
