import { Router } from 'express';
import * as emailController from '../controllers/emailController';

const router = Router();

router.post('/send-document', emailController.sendDocument);
router.post('/test', emailController.sendTestEmail);
router.get('/verify', emailController.verifyEmailConfig);

export default router;
