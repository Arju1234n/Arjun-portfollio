import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth';
import * as auth from '../controllers/auth.controller';

const router = Router();

router.post('/login',    authLimiter, auth.login);
router.post('/refresh',  auth.refresh);
router.post('/logout',   authenticate, auth.logout);
router.get('/me',        authenticate, auth.me);
router.patch('/profile', authenticate, auth.updateProfile);
router.patch('/password',authenticate, auth.changePassword);

export default router;
