import { useMutation } from '@tanstack/react-query';
import { emailService } from '../services/emailService';
import { SendDocumentEmailDTO } from '../../../shared/types/email';

export const useSendEmail = () => {
  return useMutation({
    mutationFn: (data: SendDocumentEmailDTO) => emailService.sendDocument(data),
  });
};

export const useSendTestEmail = () => {
  return useMutation({
    mutationFn: (recipientEmail: string) => emailService.sendTestEmail(recipientEmail),
  });
};
