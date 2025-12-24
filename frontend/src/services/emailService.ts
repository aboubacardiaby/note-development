import { api } from './api';
import { SendDocumentEmailDTO, EmailResponse } from '../../../shared/types/email';

export const emailService = {
  async sendDocument(data: SendDocumentEmailDTO): Promise<EmailResponse> {
    const response = await api.post<EmailResponse>('/email/send-document', data);
    return response.data;
  },

  async sendTestEmail(recipientEmail: string): Promise<EmailResponse> {
    const response = await api.post<EmailResponse>('/email/test', { recipientEmail });
    return response.data;
  },

  async verifyEmailConfig(): Promise<{ success: boolean; message: string }> {
    const response = await api.get<{ success: boolean; message: string }>('/email/verify');
    return response.data;
  },
};
