import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './src/config/dbConfig.js';
import { FRONTEND_URL, PORT } from './src/config/serverConfig.js';
import apiRouter from './src/routes/apiRoutes.js';

const app = express();
app.use(
  cors({
    origin: [FRONTEND_URL, 'https://leaderboard-task-eight.vercel.app'],

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' });
});

// port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
