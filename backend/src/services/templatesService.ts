import { prisma } from '../config/database';
import { CreateTemplateDTO, UpdateTemplateDTO, Template } from '../../../shared/types/template';

class TemplatesService {
  async createTemplate(data: CreateTemplateDTO): Promise<Template> {
    return prisma.template.create({
      data: {
        ...data,
        fields: data.fields as any,
      }
    });
  }

  async getTemplates(filters?: {
    category?: string;
    meetingType?: string;
    isActive?: boolean;
  }): Promise<Template[]> {
    return prisma.template.findMany({
      where: filters,
      orderBy: { name: 'asc' }
    });
  }

  async getTemplateById(id: string): Promise<Template | null> {
    return prisma.template.findUnique({ where: { id } });
  }

  async updateTemplate(id: string, data: UpdateTemplateDTO): Promise<Template> {
    const updateData: any = { ...data };
    if (data.fields) {
      updateData.fields = data.fields as any;
    }
    return prisma.template.update({
      where: { id },
      data: updateData
    });
  }

  async deleteTemplate(id: string): Promise<void> {
    await prisma.template.delete({ where: { id } });
  }
}

export default new TemplatesService();
