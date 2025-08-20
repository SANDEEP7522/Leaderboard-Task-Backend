import express from 'express';

import {
  claimPointsController,
  createUserController,
  getAllUsersController,
  getRankingsController,
} from '../../controllers/usersController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createUserController);

router.get('/all', isAuthenticated, getAllUsersController);

router.post('/:userId/claim', isAuthenticated, claimPointsController);

router.get('/rankings', isAuthenticated, getRankingsController);

export default router;
