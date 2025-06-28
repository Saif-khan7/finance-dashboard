import { RequestHandler } from 'express';
import { Transaction } from '../models/transaction.model';

interface ListQuery {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  sort?: string;
  start?: string;
  end?: string;
}

/** GET /api/v1/transactions */
export const listTransactions: RequestHandler<{}, any, any, ListQuery> = async (
  req,
  res
) => {
  const {
    page = '1',
    limit = '10',
    search,
    status,
    sort = '-date',
    start,
    end,
  } = req.query;

  const q: Record<string, unknown> = {};
  if (search) q.title = { $regex: search, $options: 'i' };
  if (status) q.status = status;
  if (start || end)
    q.date = {
      ...(start && { $gte: new Date(start) }),
      ...(end && { $lte: new Date(end) }),
    };

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const data = await Transaction.find(q)
    .sort(String(sort))
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  const total = await Transaction.countDocuments(q);

  res.json({ data, total, page: pageNum });
};
