import 'dotenv/config';
import './types/express';
import express, {
  type Application,
} from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import { errorLogger, requestLogger } from 'middlewares/logger';
import { errorHandler } from 'middlewares/errorHandler';
import setupRoutes from './routes';

const app: Application = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mestodb';

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

setupRoutes(app);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();
