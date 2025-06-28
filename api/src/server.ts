import { app } from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(port, () => console.log(`🚀  Server http://localhost:${port}`));
})();
