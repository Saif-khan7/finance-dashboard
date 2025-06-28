import { RequestHandler } from 'express';
import { Transaction } from '../models/transaction.model';
import { format } from 'fast-csv';

interface ExportBody {
  fields: string[];
  filters?: Record<string, unknown>;
}

/** POST /api/v1/export */
export const exportCsv: RequestHandler<{}, any, ExportBody> = async (req, res) => {
  const { fields, filters = {} } = req.body;

  if (!fields?.length) {
    res.status(400).json({ message: 'fields array required' });
    return;
  }

  // Build Mongo query from filters (reuse same logic as listTransactions if you like)
  const q = filters;

  // Set headers for file download
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');

  // Stream Mongo → CSV → response
  const cursor = Transaction.find(q).cursor();
  const csvStream = format({ headers: fields });

  cursor.on('data', (doc) => {
    const row: Record<string, unknown> = {};
    fields.forEach((f) => (row[f] = (doc as any)[f]));
    csvStream.write(row);
  });

  cursor.on('end', () => csvStream.end());
  csvStream.pipe(res);
};
