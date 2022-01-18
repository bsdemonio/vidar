import Bill from '../../../models/bill';
import Installment from '../../../models/installment';

type Args = {
  id: string;
};

const undoPayInstallment = async (_parent: any, args: Args) => {
  const { id } = args;

  const installment = await Installment.findById(id);

  if (!installment) throw new Error('The installment does not exist');

  const bill = await Bill.findById(installment.bill);

  if (!bill) throw new Error('Unexpected error');

  if (installment.isPaid) {
    installment.isPaid = false;

    await installment.save();

    bill.balance += installment.amount;

    await bill.save();
  }

  return installment;
};

export default undoPayInstallment;
