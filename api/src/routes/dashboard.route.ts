import { Router } from 'express';
import { summary } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';

export const dashboardRouter = Router();

dashboardRouter.get('/summary', protect, summary);
