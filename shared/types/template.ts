export type TemplateCategory = 'technical' | 'medical' | 'meeting' | 'custom';
export type OutputFormat = 'markdown' | 'structured' | 'custom';

export interface TemplateField {
  name: string;
  type: 'text' | 'date' | 'list' | 'section';
  required: boolean;
  placeholder?: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  meetingType: string;
  promptTemplate: string;
  outputFormat: OutputFormat;
  fields: TemplateField[];
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTemplateDTO {
  name: string;
  description?: string;
  category: TemplateCategory;
  meetingType: string;
  promptTemplate: string;
  outputFormat: OutputFormat;
  fields: TemplateField[];
  isDefault?: boolean;
}

export interface UpdateTemplateDTO {
  name?: string;
  description?: string;
  category?: TemplateCategory;
  meetingType?: string;
  promptTemplate?: string;
  outputFormat?: OutputFormat;
  fields?: TemplateField[];
  isDefault?: boolean;
  isActive?: boolean;
}
