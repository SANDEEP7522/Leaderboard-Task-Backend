import User from '../schema/user.js';
import ValidationError from '../utils/errors/validationError.js';

export const createUserService = async (name) => {
  try {
    const user = new User({ name });
    return await user.save();
  } catch (error) {
    console.log('User service error', error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        { error: ['A user with the same name already exists'] },
        'Duplicate user'
      );
    }

    throw error;
  }
};
export const getAllUsersService = async () => {
  try {
    return await User.find().sort({ totalPoints: -1 });
  } catch (error) {
    console.log('User service error', error);
    throw new ValidationError(
      { error: ['Database error occurred while fetching users'] },
      'Database error occurred'
    );
  }
};

// Get user by ID
export const getUserByIdService = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ValidationError(
        { error: ['User not found'] },
        'User not found'
      );
    }

    return user;
  } catch (error) {
    console.log('User service error', error);
    throw new ValidationError(
      { error: ['Database error occurred while fetching user'] },
      'Database error occurred'
    );
  }
};

export const updateUserPointsService = async (userId, points) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    if (!user) {
      throw new ValidationError(
        { error: ['User not found'] },
        'User not found'
      );
    }

    return user;
  } catch (error) {
    console.log('User service error', error);
    throw new ValidationError(
      { error: ['Database error occurred while updating user points'] },
      'Database error occurred'
    );
  }
};
