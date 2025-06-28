// src/seed/seed.ts
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

dotenv.config();

/* ------------------------------------------------------------------ */
/* 1. Load JSON file                                                  */
/* ------------------------------------------------------------------ */
const file = path.join(__dirname, '../../../transactions.json');
const raw: any[] = JSON.parse(fs.readFileSync(file, 'utf-8'));

/* ------------------------------------------------------------------ */
/* 2. DB bootstrap                                                    */
/* ------------------------------------------------------------------ */
(async () => {
  await connectDB();

  /* admin user ------------------------------------------------------ */
  const adminEmail = 'admin@example.com';
  if (!(await User.findOne({ email: adminEmail }))) {
    await User.create({
      email: adminEmail,
      password: 'Passw0rd!',
      role: 'admin',
    });
    console.log('👤  Demo admin user seeded');
  }

  /* transactions ---------------------------------------------------- */
  const transformed = raw.map((r) => ({
    /* helper fields */
    title: `${r.category} #${r.id}`,
    date:  new Date(r.date),
    amount: r.amount,

    /* derived fields */
    type:   r.category === 'Revenue' ? 'income' : 'expense',
    status: r.status   === 'Paid'    ? 'completed' : 'pending',

    /* original JSON fields */
    category:     r.category,
    user_id:      r.user_id,
    user_name:    r.user_id,            // placeholder name
    user_profile: r.user_profile,
  }));

  await Transaction.deleteMany();
  await Transaction.insertMany(transformed);

  console.log(`✅  Seed complete — ${transformed.length} transactions`);
  process.exit(0);
})();
