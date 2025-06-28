import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Express server listening on port ${PORT}`);
});
