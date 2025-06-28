import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  title: string;
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  status: 'completed' | 'pending';
  category: string;
  user_id: string;
  user_name: string;       // NEW
  user_profile: string;
}

const schema = new Schema<ITransaction>({
  title: String,
  type: { type: String, enum: ['income', 'expense'] },
  amount: Number,
  date: Date,
  status: { type: String, enum: ['completed', 'pending'] },
  category: String,
  user_id: String,
  user_name: String,
  user_profile: String,
},{timestamps:true});
export const Transaction = model<ITransaction>('Transaction', schema);
