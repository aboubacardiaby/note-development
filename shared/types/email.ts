export type DeliveryFormat = 'html-inline' | 'pdf-attachment' | 'docx-attachment' | 'markdown-attachment';

export interface SendDocumentEmailDTO {
  documentId: string;
  recipientEmail: string;
  deliveryFormat: DeliveryFormat;
  senderName?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  from: string;
  fromName: string;
}
