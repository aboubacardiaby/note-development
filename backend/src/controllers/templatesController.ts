import { Request, Response } from 'express';
import templatesService from '../services/templatesService';
import { CreateTemplateDTO, UpdateTemplateDTO } from '../../../shared/types/template';

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const data: CreateTemplateDTO = req.body;
    const template = await templatesService.createTemplate(data);
    res.status(201).json(template);
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
};

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const { category, meetingType, isActive } = req.query;
    const templates = await templatesService.getTemplates({
      category: category as string,
      meetingType: meetingType as string,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    });
    res.json(templates);
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await templatesService.getTemplateById(id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateTemplateDTO = req.body;
    const template = await templatesService.updateTemplate(id, data);
    res.json(template);
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ error: 'Failed to update template' });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await templatesService.deleteTemplate(id);
    res.status(204).send();
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: 'Failed to delete template' });
  }
};
