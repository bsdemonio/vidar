import mongoose, { Schema } from 'mongoose';

export type IInstallment = {
  bill: string;
  number: number;
  dueDate: Date;
  amount: number;
  isPaid?: boolean;
} & mongoose.Document;

export const installmentSchema = new mongoose.Schema({
  amount: {
    required: true,
    type: Number,
  },
  bill: {
    ref: 'Bill',
    required: true,
    type: Schema.Types.ObjectId,
  },
  dueDate: {
    required: true,
    type: Date,
  },
  isPaid: {
    type: Boolean,
  },
  number: {
    required: true,
    type: Number,
  },
});

const Installment = mongoose.model<IInstallment>('Installment', installmentSchema);

export default Installment;
