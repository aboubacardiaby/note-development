import { Request, Response } from 'express';
import emailService from '../services/emailService';
import { SendDocumentEmailDTO } from '../../../shared/types/email';

export const sendDocument = async (req: Request, res: Response) => {
  try {
    const { documentId, recipientEmail, deliveryFormat, senderName } = req.body as SendDocumentEmailDTO;

    // Validate required fields
    if (!documentId || !recipientEmail || !deliveryFormat) {
      return res.status(400).json({
        error: 'Missing required fields: documentId, recipientEmail, and deliveryFormat are required'
      });
    }

    // Validate deliveryFormat
    const validFormats = ['html-inline', 'pdf-attachment', 'docx-attachment', 'markdown-attachment'];
    if (!validFormats.includes(deliveryFormat)) {
      return res.status(400).json({
        error: `Invalid delivery format. Must be one of: ${validFormats.join(', ')}`
      });
    }

    // Send email via email service
    const result = await emailService.sendDocument({
      to: recipientEmail,
      documentId,
      deliveryFormat,
      senderName,
    });

    if (!result.success) {
      // Determine appropriate status code based on error message
      const statusCode =
        result.message.includes('not found') ? 404 :
        result.message.includes('Invalid email') ? 400 :
        503;

      return res.status(statusCode).json({
        error: result.message
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({
      error: 'Failed to send email. Please try again later.'
    });
  }
};

export const sendTestEmail = async (req: Request, res: Response) => {
  try {
    const { recipientEmail } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({
        error: 'recipientEmail is required'
      });
    }

    const result = await emailService.sendTestEmail(recipientEmail);

    if (!result.success) {
      return res.status(400).json({
        error: result.message
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Send test email error:', error);
    res.status(500).json({
      error: 'Failed to send test email'
    });
  }
};

export const verifyEmailConfig = async (req: Request, res: Response) => {
  try {
    const isConnected = await emailService.verifyConnection();

    if (!isConnected) {
      return res.status(503).json({
        error: 'Email service is not properly configured or cannot connect to SMTP server'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Email service is properly configured and connected'
    });
  } catch (error) {
    console.error('Verify email config error:', error);
    res.status(500).json({
      error: 'Failed to verify email configuration'
    });
  }
};
