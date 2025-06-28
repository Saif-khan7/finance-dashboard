import { Router } from 'express';
import { exportCsv } from '../controllers/export.controller';
import { protect } from '../middleware/auth.middleware';

export const exportRouter = Router();

exportRouter.post('/', protect, exportCsv);
