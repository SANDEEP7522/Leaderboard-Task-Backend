import { StatusCodes } from 'http-status-codes';
import { createUserService } from '../services/usersService';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects';

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

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, 'User fetched successfully'));
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

export const updateUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await updateUserByIdService(id, name);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, 'User updated successfully'));
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
