import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { authRouter } from './routes/auth.route';
import { transactionRouter } from './routes/transaction.route';
import { dashboardRouter } from './routes/dashboard.route';
import { exportRouter } from './routes/export.route';
import { setupSwagger } from './config/swagger'; 

export const app = express();

/* ───── global middleware ───── */
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

/* ───── feature routes ───── */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/export', exportRouter);

setupSwagger(app);  

/* ───── health-check ───── */
app.get('/', (_req, res): void => {
  res.send('Finance API up 🎉');      // no value returned ⇒ void
});
