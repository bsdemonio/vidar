import mongoose, { Schema } from 'mongoose';

export type IInstallment = {
  bill: string;
  number: number;
  dueDate: Date;
  amount: number;
  isPaid?: boolean;
} & mongoose.Document;

export const installmentSchema = new mongoose.Schema({
  bill: {
    type: Schema.Types.ObjectId,
    ref: 'Bill',
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
  },
});

const Installment = mongoose.model<IInstallment>('Installment', installmentSchema);

export default Installment;
