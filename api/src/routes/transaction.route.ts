// src/routes/transaction.route.ts
import { Router } from 'express';
import { listTransactions } from '../controllers/transaction.controller';
import { protect } from '../middleware/auth.middleware';

export const transactionRouter = Router();

/**
 * @openapi
 * /api/v1/transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: List transactions with pagination, search and filters
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [completed, pending] }
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Paginated list
 */
transactionRouter.get('/', protect, listTransactions);
