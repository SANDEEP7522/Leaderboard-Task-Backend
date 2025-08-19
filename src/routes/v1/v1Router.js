import express from 'express';

import userRouter from './users.js';
import usersRouter from './usersRoutes.js';

const router = express.Router();

router.use('/users', userRouter);

router.use('/users', usersRouter);

export default router;
