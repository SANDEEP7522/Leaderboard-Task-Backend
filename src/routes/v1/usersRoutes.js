import express from 'express';

import {
  claimPointsController,
  createUserController,
  getAllUsersController,
  getRankingsController,
} from '../../controllers/usersController.js';

const router = express.Router();

router.post('/', createUserController);

router.get('/all', getAllUsersController);

router.post('/:userId/claim', claimPointsController);

router.get('/rankings', getRankingsController);

export default router;
