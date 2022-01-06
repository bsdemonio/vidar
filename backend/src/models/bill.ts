import mongoose, { Schema } from 'mongoose';

import Installment from './installment';

export type IBill = {
  user: string;
  name: string;
  category: string;
  installmentsNumber: number;
  total: number;
  balance: number;
  initialDate: Date;
  finalDate: Date;
  placeToPay: string;
} & mongoose.Document;

export const billSchema = new mongoose.Schema({
  balance: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: String,
  },
  finalDate: {
    required: true,
    type: Date,
  },
  initialDate: {
    required: true,
    type: Date,
  },
  installmentsNumber: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  placeToPay: {
    type: String,
  },
  total: {
    required: true,
    type: Number,
  },
  user: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
});

billSchema.post('remove', async (bill: IBill) => {
  await Installment.deleteMany({
    bill: bill.id,
  });
});

const Bill = mongoose.model<IBill>('Bill', billSchema);

export default Bill;
