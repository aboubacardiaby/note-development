import { api } from './api';
import { Template, CreateTemplateDTO, UpdateTemplateDTO } from '../../../shared/types/template';

export const templatesService = {
  async createTemplate(data: CreateTemplateDTO): Promise<Template> {
    const response = await api.post<Template>('/templates', data);
    return response.data;
  },

  async getTemplates(filters?: {
    category?: string;
    meetingType?: string;
    isActive?: boolean;
  }): Promise<Template[]> {
    const response = await api.get<Template[]>('/templates', { params: filters });
    return response.data;
  },

  async getTemplateById(id: string): Promise<Template> {
    const response = await api.get<Template>(`/templates/${id}`);
    return response.data;
  },

  async updateTemplate(id: string, data: UpdateTemplateDTO): Promise<Template> {
    const response = await api.put<Template>(`/templates/${id}`, data);
    return response.data;
  },

  async deleteTemplate(id: string): Promise<void> {
    await api.delete(`/templates/${id}`);
  },
};
