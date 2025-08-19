import ClaimHistory from '../schema/claimHistory.js';
import Public from '../schema/normalUser.js';
import ValidationError from '../utils/errors/validationError.js';

export const createUserService = async (name) => {
  try {
    const user = new Public({ name });
    return await user.save();
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        { error: ['A user with the same name already exists'] },
        'Duplicate user'
      );
    }

    console.log('User service error', error);
    throw error;
  }
};
export const getAllUsersService = async () => {
  try {
    return await Public.find().sort({ totalPoints: -1 });
  } catch (error) {
    console.log('User service error', error);
    throw new ValidationError(
      { error: ['Database error occurred while fetching users'] },
      'Database error occurred'
    );
  }
};

export const claimPointsService = async (userId) => {
  try {
    const claimedPoints = Math.floor(Math.random() * 10) + 1;

    const user = await Public.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: claimedPoints } },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    await new ClaimHistory({
      userId,
      pointsClaimed: claimedPoints,
      claimedAt: new Date()
    }).save();

    return { user, claimedPoints };
  } catch (error) {
    console.log('Claim points service error', error);
    throw error;
  }
};

export const getRankingsService = async () => {
  try {
    // Get all users sorted by totalPoints descending
    const users = await Public.find({}).sort({ totalPoints: -1 }).lean();

    // Assign ranks based on sorting
    let rank = 0;
    let lastPoints = null;
    let skipRank = 1;

    users.forEach((user) => {
      if (user.totalPoints !== lastPoints) {
        rank += skipRank;
        skipRank = 1;
      } else {
        skipRank++;
      }
      user.rank = rank;
      lastPoints = user.totalPoints;
    });

    return users;
  } catch (error) {
    console.log('Get rankings service error', error);
    throw error;
  }
};
