import Bill from '../../../models/bill';
import Installment from '../../../models/installment';
import { IUser } from '../../../models/user';

type Context = {
  user: IUser;
};

const bills = async (_parent: any, _args: any, context: Context) => {
  const { user } = context;
  const dbBills = await Bill.find({ user: user.id });

  return dbBills.map(async (bill) => ({
    installments: await Installment.find({ bill: bill.id }),
    installmentsNumber: bill.installmentsNumber,
    name: bill.name,
    total: bill.total,
  }));
};

export default bills;
