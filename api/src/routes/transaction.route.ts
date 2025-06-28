import { Router } from 'express';
import { listTransactions } from '../controllers/transaction.controller';
import { protect } from '../middleware/auth.middleware';

export const transactionRouter = Router();

transactionRouter.get('/', protect, listTransactions);
