import { Router } from 'express';
import notesRoutes from './notes';
import templatesRoutes from './templates';
import aiRoutes from './ai';
import exportRoutes from './export';

const router = Router();

router.use('/notes', notesRoutes);
router.use('/templates', templatesRoutes);
router.use('/ai', aiRoutes);
router.use('/export', exportRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
