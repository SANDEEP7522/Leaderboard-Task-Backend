import mongoose from 'mongoose';

const normalUserSchema = new mongoose.Schema({
  name: {
    type: String, // it is a string (sandeep)
    required: [true, 'Name is required'],
    unique: [true, 'Name already exists'],
    trim: true
  },
  totalPoints: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true 
});

const Users = mongoose.model('Users', normalUserSchema);
export default Users; // export the model because we want to use it in other places or files

