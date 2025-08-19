import mongoose from 'mongoose';

const normalUserSchema = new mongoose.Schema(
  {
    name: {
      type: String, // it is a string (sandeep)
      required: [true, 'Name is required'],
      unique: [true, 'Name already exists']
    },
    totalPoints: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Public = mongoose.model('Public', normalUserSchema);
export default Public; // export the model because we want to use it in other places or files
