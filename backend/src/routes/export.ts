import { Router } from 'express';
import * as exportController from '../controllers/exportController';

const router = Router();

router.get('/documents', exportController.getDocuments);
router.get('/documents/:documentId', exportController.getDocumentById);
router.get('/documents/:documentId/download', exportController.exportDocument);

export default router;
