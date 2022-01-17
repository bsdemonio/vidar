import { ApolloError } from 'apollo-server-express';
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
const isRecurrenceSpanValid = (recurrenceSpan: string) => {
  const validSpans = ['y', 'M', 'w', 'd'];
  return validSpans.includes(recurrenceSpan);
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

  if (!isRecurrenceSpanValid(recurrenceSpan)) {
    throw new ApolloError(
      `The recurrenceSpan: ${recurrenceSpan} entered is incorrect. The expected values are :y, M, w, d`
    );
  }
  const initialDate = new Date(date);
  const finalDate = moment(initialDate)
    .add(installments - 1 * recurrenceNumber, recurrenceSpan)
    .toDate();

  const total = installments * amount;

  const newBill = await Bill.create({
    balance: total,
    category,
    finalDate,
    initialDate: moment(initialDate).toDate(),
    installmentsNumber: installments,
    name,
    placeToPay,
    total,
    user: user.id,
  });

  const installmentsToCreate = [];

  for (let i = 0; i < installments; i += 1) {
    installmentsToCreate.push({
      amount,
      bill: newBill.id,
      dueDate: moment(initialDate)
        .add(i * recurrenceNumber, recurrenceSpan)
        .toDate(),
      isPaid: false,
      number: i + 1,
    });
  }

  const newInstallments = await Installment.create(installmentsToCreate);

  return {
    finalDate: newBill.finalDate,
    id: newBill.id,
    initialDate: newBill.initialDate,
    installments: newInstallments,
    name: newBill.name,
    placeToPay: newBill.placeToPay,
  };
};

export default createBill;
