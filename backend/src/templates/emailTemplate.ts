interface EmailTemplateOptions {
  documentTitle: string;
  content?: string;
  hasAttachment?: boolean;
  attachmentFormat?: string;
  appName?: string;
  appUrl?: string;
}

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validates that required fields are present and non-empty
 */
const validateOptions = (options: EmailTemplateOptions): void => {
  if (!options.documentTitle || options.documentTitle.trim() === '') {
    throw new Error('documentTitle is required and cannot be empty');
  }

  if (options.hasAttachment && (!options.attachmentFormat || options.attachmentFormat.trim() === '')) {
    throw new Error('attachmentFormat is required when hasAttachment is true');
  }

  if (!options.hasAttachment && (!options.content || options.content.trim() === '')) {
    throw new Error('content is required when hasAttachment is false');
  }
};

export const generateEmailHTML = (options: EmailTemplateOptions): string => {
  // Validate inputs
  validateOptions(options);

  const {
    documentTitle,
    content,
    hasAttachment,
    attachmentFormat,
    appName = 'NoteDevelopment',
    appUrl = 'https://notedevelopment.com'
  } = options;

  // Sanitize user inputs to prevent XSS
  const safeDocumentTitle = escapeHtml(documentTitle);
  const safeAttachmentFormat = attachmentFormat ? escapeHtml(attachmentFormat) : '';
  const safeAppName = escapeHtml(appName);

  const emailBody = hasAttachment
    ? `
      <p>Please find your transformed document attached to this email.</p>
      <p><strong>Document:</strong> ${safeDocumentTitle}</p>
      <p><strong>Format:</strong> ${safeAttachmentFormat.toUpperCase()}</p>
    `
    : content || '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeDocumentTitle}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      border-bottom: 3px solid #4f46e5;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      color: #4f46e5;
      font-size: 24px;
    }
    .content {
      margin: 20px 0;
    }
    .content h1 {
      color: #1f2937;
      font-size: 28px;
      margin-top: 30px;
      margin-bottom: 15px;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 10px;
    }
    .content h2 {
      color: #374151;
      font-size: 22px;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    .content h3 {
      color: #4b5563;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .content p {
      margin: 10px 0;
      color: #4b5563;
    }
    .content ul, .content ol {
      margin: 10px 0;
      padding-left: 25px;
    }
    .content li {
      margin: 5px 0;
      color: #4b5563;
    }
    .content code {
      background-color: #f3f4f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    .content pre {
      background-color: #1f2937;
      color: #f9fafb;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    .content pre code {
      background-color: transparent;
      color: #f9fafb;
      padding: 0;
    }
    .content blockquote {
      border-left: 4px solid #4f46e5;
      margin: 15px 0;
      padding-left: 20px;
      color: #6b7280;
      font-style: italic;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
    }
    .footer a {
      color: #4f46e5;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      .container {
        padding: 20px;
      }
      .content h1 {
        font-size: 24px;
      }
      .content h2 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📝 ${safeAppName}</h1>
    </div>
    <div class="content">
      ${emailBody}
    </div>
    <div class="footer">
      <p>Sent from <a href="${appUrl}">${safeAppName}</a></p>
      <p>AI-powered note transformation and sharing</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

export const generatePlainTextEmail = (options: EmailTemplateOptions): string => {
  // Validate inputs
  validateOptions(options);

  const {
    documentTitle,
    content,
    hasAttachment,
    attachmentFormat,
    appName = 'NoteDevelopment',
    appUrl = 'https://notedevelopment.com'
  } = options;

  if (hasAttachment) {
    return `
${appName} - Transformed Document

Please find your transformed document attached to this email.

Document: ${documentTitle}
Format: ${attachmentFormat?.toUpperCase()}

---
Sent from ${appName}
${appUrl}
AI-powered note transformation and sharing
    `.trim();
  }

  return `
${appName} - ${documentTitle}

${content || ''}

---
Sent from ${appName}
${appUrl}
AI-powered note transformation and sharing
  `.trim();
};
