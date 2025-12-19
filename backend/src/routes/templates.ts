import { Router } from 'express';
import * as templatesController from '../controllers/templatesController';

const router = Router();

router.post('/', templatesController.createTemplate);
router.get('/', templatesController.getTemplates);
router.get('/:id', templatesController.getTemplateById);
router.put('/:id', templatesController.updateTemplate);
router.delete('/:id', templatesController.deleteTemplate);

export default router;
