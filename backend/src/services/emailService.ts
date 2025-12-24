import nodemailer from 'nodemailer';
import { prisma } from '../config/database';
import { config } from '../config/env';
import exportService from './exportService';
import { generateEmailHTML, generatePlainTextEmail } from '../templates/emailTemplate';
import { DeliveryFormat, EmailResponse } from '../../../shared/types/email';

interface SendDocumentOptions {
  to: string;
  documentId: string;
  deliveryFormat: DeliveryFormat;
  senderName?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.smtpHost,
      port: config.email.smtpPort,
      secure: config.email.smtpSecure,
      auth: {
        user: config.email.smtpUser,
        pass: config.email.smtpPass,
      },
    });
  }

  async sendDocument(options: SendDocumentOptions): Promise<EmailResponse> {
    try {
      // Validate email format
      if (!this.isValidEmail(options.to)) {
        return {
          success: false,
          message: 'Invalid email address format',
        };
      }

      // Fetch document from database
      const document = await prisma.document.findUnique({
        where: { id: options.documentId },
      });

      if (!document) {
        return {
          success: false,
          message: 'Document not found',
        };
      }

      // Prepare email content based on delivery format
      let emailHTML: string;
      let plainText: string;
      let attachments: nodemailer.Attachment[] = [];

      if (options.deliveryFormat === 'html-inline') {
        // Send HTML content in email body
        const htmlContent = await exportService.exportToHTML(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        emailHTML = htmlContent;
        plainText = generatePlainTextEmail({
          documentTitle: document.title,
          content: document.content,
        });
      } else {
        // Send as attachment
        const attachment = await this.generateAttachment(
          document,
          options.deliveryFormat
        );
        attachments.push(attachment);

        emailHTML = generateEmailHTML({
          documentTitle: document.title,
          hasAttachment: true,
          attachmentFormat: options.deliveryFormat,
        });
        plainText = generatePlainTextEmail({
          documentTitle: document.title,
          hasAttachment: true,
          attachmentFormat: options.deliveryFormat,
        });
      }

      // Send email
      const fromName = options.senderName || config.email.fromName;
      const result = await this.transporter.sendMail({
        from: `${fromName} <${config.email.from}>`,
        to: options.to,
        subject: `Your transformed document: ${document.title}`,
        text: plainText,
        html: emailHTML,
        attachments: attachments,
      });

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  private async generateAttachment(
    document: any,
    format: DeliveryFormat
  ): Promise<nodemailer.Attachment> {
    let buffer: Buffer | string;
    let filename: string;
    let contentType: string;

    switch (format) {
      case 'pdf-attachment':
        buffer = await exportService.exportToPDF(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        filename = `${this.sanitizeFilename(document.title)}.pdf`;
        contentType = 'application/pdf';
        break;

      case 'docx-attachment':
        buffer = await exportService.exportToDOCX(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        filename = `${this.sanitizeFilename(document.title)}.docx`;
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;

      case 'markdown-attachment':
        buffer = await exportService.exportToMarkdown(
          document.content,
          document.title,
          { includeMetadata: true }
        );
        filename = `${this.sanitizeFilename(document.title)}.md`;
        contentType = 'text/markdown';
        break;

      default:
        throw new Error(`Unsupported attachment format: ${format}`);
    }

    return {
      filename,
      content: buffer,
      contentType,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-z0-9\s-_]/gi, '')
      .replace(/\s+/g, '_')
      .substring(0, 100);
  }

  async sendTestEmail(to: string): Promise<EmailResponse> {
    try {
      if (!this.isValidEmail(to)) {
        return {
          success: false,
          message: 'Invalid email address format',
        };
      }

      const result = await this.transporter.sendMail({
        from: `${config.email.fromName} <${config.email.from}>`,
        to,
        subject: 'Test Email - NoteDevelopment',
        text: 'This is a test email from NoteDevelopment. Your email configuration is working correctly!',
        html: generateEmailHTML({
          documentTitle: 'Email Configuration Test',
          content: '<p>This is a test email from NoteDevelopment.</p><p>Your email configuration is working correctly!</p>',
        }),
      });

      return {
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
      };
    } catch (error) {
      console.error('Error sending test email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send test email',
      };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection error:', error);
      return false;
    }
  }
}

export default new EmailService();
