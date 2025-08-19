import mongoose from 'mongoose';

const claimHistorySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,// this help to get the user details
    ref: 'Public', // it is the name of the model
    required: true, // it is required field
  },
  pointsClaimed: {
    type: Number, // it is a number
    required: true,
    min: 1, //  minimum value of the points
    max: 10,  // maximum value of the points
  },
  claimedAt: {
    type: Date, // use for date
    default: Date.now // use for current date
  }
}, {
  timestamps: false
});

const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema);
export default ClaimHistory;