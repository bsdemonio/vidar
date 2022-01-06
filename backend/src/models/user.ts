import mongoose from 'mongoose';

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  created?: string;
  changed?: string;
  lastActive?: string;
} & mongoose.Document;

const userSchema = new mongoose.Schema({
  changed: {
    default: Date.now,
    type: Date,
  },
  created: {
    default: Date.now,
    type: Date,
  },
  email: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  hashedPassword: {
    required: true,
    type: String,
  },
  lastActive: {
    type: Date,
  },
  lastName: {
    required: true,
    type: String,
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
