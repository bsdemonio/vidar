import moment from 'moment';

import Bill from '../../../models/bill';
import Installment from '../../../models/installment';
import { IUser } from '../../../models/user';

type Args = {
  name: string;
  amount: number;
  installments: number;
  recurrenceNumber: number;
  recurrenceSpan: 'y' | 'M' | 'w' | 'd';
  date: string;
};

type Context = {
  user: IUser;
};

const createBill = async (_parent: any, args: Args, context: Context) => {
  const { user } = context;
  const { name, amount, installments, recurrenceNumber, recurrenceSpan, date } = args;

  const total = installments * amount;

  const newBill = await Bill.create({
    user: user.id,
    name,
    installmentsNumber: installments,
    total,
    balance: total,
  });

  const installmentsToCreate = [];

  for (let i = 0; i < installments; i += 1) {
    installmentsToCreate.push({
      bill: newBill.id,
      number: i + 1,
      dueDate: moment(new Date(date))
        .add(i * recurrenceNumber, recurrenceSpan)
        .toDate(),
      amount,
      isPaid: false,
    });
  }

  const newInstallments = await Installment.create(installmentsToCreate);

  return { id: newBill.id, name: newBill.name, installments: newInstallments };
};

export default createBill;
