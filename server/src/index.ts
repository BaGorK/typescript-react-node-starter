import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { FRONT_END_URL, NODE_ENV, PORT } from './constants/env';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { connectToDatabase } from './config/db';
import { userRoutes } from './routes/user.route';
import { NOT_FOUND } from './constants/http';

const app = express();

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: FRONT_END_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

app.use('/api/v1/users', userRoutes)

app.all('*', (req: Request, res: Response) => {
  res.status(NOT_FOUND).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
})

app.use(globalErrorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`DB connected and Server is running on port ${PORT}...`);
});
