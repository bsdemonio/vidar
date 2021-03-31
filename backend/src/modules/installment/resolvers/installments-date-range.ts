import Bill from '../../../models/bill';
import Installment, { IInstallment } from '../../../models/installment';
import { IUser } from '../../../models/user';

type Context = {
  user: IUser;
};

type Args = {
  startDate: string;
  endDate: string;
};

const installments = async (
  _parent: any,
  args: Args,
  context: Context
): Promise<IInstallment[]> => {
  const { user } = context;
  const { startDate, endDate } = args;
  const dbBills = await Bill.find({ user: user.id });

  return Installment.find({
    bill: { $in: dbBills.map((bill) => bill.id) },
    dueDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  })
    .sort({ dueDate: 1 })
    .populate('bill');
};

export default installments;
