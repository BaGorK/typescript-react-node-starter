import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

const PORT = process.env.PORT || 3000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB as string);

    app.listen(PORT, () => {
      console.log(`DB connected and Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.error('ERROR: 🔥 ', err);
    process.exit(1);
  }
};

connect();
