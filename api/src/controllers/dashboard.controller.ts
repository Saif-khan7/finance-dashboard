import { RequestHandler } from 'express';
import { Transaction } from '../models/transaction.model';

/** GET /api/v1/dashboard/summary */
export const summary: RequestHandler = async (_req, res) => {
  const agg = await Transaction.aggregate([
    {
      $group: {
        _id: { month: { $month: '$date' } },
        income: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
        expense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);

  res.json(agg);          // no return value ⇒ void
};
