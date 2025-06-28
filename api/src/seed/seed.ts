// src/seed/seed.ts
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

dotenv.config();

// ⬇️  Adjust the relative path if you move files
const file = path.join(__dirname, '../../../transactions.json');

(async () => {
  await connectDB();

  /* ------------------------------------------------------------------ */
  /* 1. Ensure admin user                                                */
  /* ------------------------------------------------------------------ */
  const adminEmail = 'admin@example.com';
  const adminPwd   = 'Passw0rd!';

  if (!(await User.findOne({ email: adminEmail }))) {
    await User.create({ email: adminEmail, password: adminPwd, role: 'admin' });
    console.log('👤  Demo admin user seeded');
  }

  /* ------------------------------------------------------------------ */
  /* 2. Transform and import transactions                               */
  /* ------------------------------------------------------------------ */
  const raw: any[] = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const transformed = raw.map((r) => ({
    // simple readable title for the table/search
    title: `${r.category} #${r.id}`,
    date: new Date(r.date),
    amount: r.amount,
    type: r.category === 'Revenue' ? 'income' : 'expense',           // map category
    status: r.status === 'Paid' ? 'completed' : 'pending',           // map status
  }));

  await Transaction.deleteMany();               // clear old data
  await Transaction.insertMany(transformed);    // bulk insert

  console.log(`✅  Seed complete — ${transformed.length} transactions`);
  process.exit(0);
})();
