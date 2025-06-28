import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  title: string;
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  status: 'completed' | 'pending';
}

const transactionSchema = new Schema<ITransaction>(
  {
    title: String,
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: Number,
    date: Date,
    status: { type: String, enum: ['completed', 'pending'], default: 'completed' },
  },
  { timestamps: true }
);

transactionSchema.index({ date: 1, status: 1 });
transactionSchema.index({ amount: -1 });

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
