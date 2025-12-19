export interface Document {
  id: string;
  title: string;
  content: string;
  format: string;
  noteId: string;
  templateId: string;
  aiModel: string;
  tokensUsed?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerateDocumentDTO {
  noteId: string;
  templateId: string;
  additionalContext?: Record<string, any>;
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'markdown' | 'html';
  includeMetadata?: boolean;
  customStyles?: Record<string, any>;
}
