import { StatusCodes } from 'http-status-codes';

import {
  claimPointsService,
  createUserService,
  getAllUsersService,
  getRankingsService
} from '../services/usersService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const createUserController = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await createUserService(name);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User created successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    return res
      .status(StatusCodes.OK)
      .json(successResponse(users, 'Users fetched successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};


export const claimPointsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user, claimedPoints } = await claimPointsService(userId);
    return res
      .status(StatusCodes.OK)
      .json(successResponse({ user, claimedPoints }, 'Points claimed successfully'));
  } catch (error) {
    console.log('Claim points controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getRankingsController = async (req, res) => {
  try {
    const users = await getRankingsService();
    return res
      .status(StatusCodes.OK)
      .json(successResponse(users, 'User rankings fetched successfully'));
  } catch (error) {
    console.log('Get rankings controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};