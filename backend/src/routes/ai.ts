import { Router } from 'express';
import * as aiController from '../controllers/aiController';

const router = Router();

router.post('/transform', aiController.transformNote);
router.post('/transform/stream', aiController.transformNoteStreaming);

export default router;
