import Bill from '../../../models/bill';
import { IUser } from '../../../models/user';

type Context = {
  user: IUser;
};

const bills = async (_parent: any, _args: any, context: Context) => {
  const { user } = context;
  const dbBills = await Bill.find({ user: user.id });

  return dbBills;
};

export default bills;
