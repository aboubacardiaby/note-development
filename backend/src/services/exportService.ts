import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { marked } from 'marked';
import { ExportOptions } from '../../../shared/types/document';

class ExportService {
  async exportToPDF(
    content: string,
    title: string,
    options?: ExportOptions
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Add title
      doc.fontSize(20).font('Helvetica-Bold').text(title, { underline: true });
      doc.moveDown();

      // Add metadata if requested
      if (options?.includeMetadata) {
        doc.fontSize(10).font('Helvetica').text(`Generated: ${new Date().toLocaleString()}`);
        doc.moveDown();
      }

      // Add content (convert markdown to plain text for PDF)
      const plainText = this.markdownToPlainText(content);
      doc.fontSize(12).font('Helvetica').text(plainText, {
        align: 'left',
        lineGap: 5
      });

      doc.end();
    });
  }

  async exportToDOCX(
    content: string,
    title: string,
    options?: ExportOptions
  ): Promise<Buffer> {
    const paragraphs: Paragraph[] = [];

    // Add title
    paragraphs.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_1,
      })
    );

    // Add metadata
    if (options?.includeMetadata) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Generated: ${new Date().toLocaleString()}`,
              italics: true,
            }),
          ],
        })
      );
      paragraphs.push(new Paragraph({ text: '' })); // Empty line
    }

    // Parse markdown and convert to paragraphs
    const lines = content.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        // Check if line is a heading
        if (line.startsWith('# ')) {
          paragraphs.push(
            new Paragraph({
              text: line.replace('# ', ''),
              heading: HeadingLevel.HEADING_1,
            })
          );
        } else if (line.startsWith('## ')) {
          paragraphs.push(
            new Paragraph({
              text: line.replace('## ', ''),
              heading: HeadingLevel.HEADING_2,
            })
          );
        } else if (line.startsWith('### ')) {
          paragraphs.push(
            new Paragraph({
              text: line.replace('### ', ''),
              heading: HeadingLevel.HEADING_3,
            })
          );
        } else {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun(line)],
            })
          );
        }
      } else {
        paragraphs.push(new Paragraph({ text: '' }));
      }
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    return await Packer.toBuffer(doc);
  }

  async exportToMarkdown(content: string, title: string, options?: ExportOptions): Promise<string> {
    let markdown = `# ${title}\n\n`;

    if (options?.includeMetadata) {
      markdown += `*Generated: ${new Date().toLocaleString()}*\n\n---\n\n`;
    }

    markdown += content;

    return markdown;
  }

  async exportToHTML(content: string, title: string, options?: ExportOptions): Promise<string> {
    const htmlContent = marked(content);

    let metadataHtml = '';
    if (options?.includeMetadata) {
      metadataHtml = `<p style="font-style: italic; color: #666;">Generated: ${new Date().toLocaleString()}</p><hr>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }
    h2 {
      color: #34495e;
      margin-top: 30px;
    }
    h3 {
      color: #555;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    blockquote {
      border-left: 4px solid #3498db;
      margin-left: 0;
      padding-left: 20px;
      color: #555;
    }
    hr {
      border: none;
      border-top: 2px solid #eee;
      margin: 30px 0;
    }
    ul, ol {
      padding-left: 30px;
    }
    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${metadataHtml}
  ${htmlContent}
</body>
</html>`;
  }

  private markdownToPlainText(markdown: string): string {
    return markdown
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/^[-*+]\s+/gm, '• ');
  }
}

export default new ExportService();
