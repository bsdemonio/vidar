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
  category: string;
  placeToPay: string;
};

type Context = {
  user: IUser;
};

const createBill = async (_parent: any, args: Args, context: Context) => {
  const { user } = context;
  const {
    name,
    amount,
    installments,
    recurrenceNumber,
    recurrenceSpan,
    date,
    category,
    placeToPay,
  } = args;

  const initialDate = new Date(date);

  const finalDate = moment(initialDate)
    .add(installments - 1 * recurrenceNumber, recurrenceSpan)
    .toDate();

  const total = installments * amount;

  const newBill = await Bill.create({
    user: user.id,
    name,
    initialDate: moment(initialDate).toDate(),
    category,
    installmentsNumber: installments,
    total,
    balance: total,
    finalDate,
    placeToPay,
  });

  const installmentsToCreate = [];

  for (let i = 0; i < installments; i += 1) {
    installmentsToCreate.push({
      bill: newBill.id,
      number: i + 1,
      dueDate: moment(initialDate)
        .add(i * recurrenceNumber, recurrenceSpan)
        .toDate(),
      amount,
      isPaid: false,
    });
  }

  const newInstallments = await Installment.create(installmentsToCreate);

  return {
    id: newBill.id,
    name: newBill.name,
    initialDate: newBill.initialDate,
    finalDate: newBill.finalDate,
    placeToPay: newBill.placeToPay,
    installments: newInstallments,
  };
};

export default createBill;
