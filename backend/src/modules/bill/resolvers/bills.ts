import Bill from '../../../models/bill';
import Installment from '../../../models/installment';
import { IUser } from '../../../models/user';

type Context = {
  user: IUser;
};

const bills = async (_parent: any, _args: any, context: Context) => {
  const { user } = context;
  const dbBills = await Bill.find({ user: user.id });

  // TODO sort by next installment due date

  return dbBills.map(async (bill) => ({
    balance: bill.balance,
    category: bill.category,
    finalDate: bill.finalDate,
    id: bill.id,
    initialDate: bill.initialDate,
    installmentsNumber: bill.installmentsNumber,
    name: bill.name,
    nextInstallment: await Installment.findOne({ bill: bill.id, isPaid: false }).sort({
      dueDate: 1,
    }),
    placeToPay: bill.placeToPay,
    total: bill.total,
  }));
};

export default bills;
