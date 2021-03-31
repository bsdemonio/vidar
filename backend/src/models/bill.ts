import mongoose, { Schema } from 'mongoose';

import Installment from './installment';

export type IBill = {
  user: string;
  name: string;
  installmentsNumber: number;
  total: number;
  balance: number;
} & mongoose.Document;

export const billSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  installmentsNumber: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

billSchema.post('remove', async (bill: IBill) => {
  await Installment.deleteMany({
    bill: bill.id,
  });
});

const Bill = mongoose.model<IBill>('Bill', billSchema);

export default Bill;
