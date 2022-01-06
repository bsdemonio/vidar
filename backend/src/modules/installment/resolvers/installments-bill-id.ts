import Installment, { IInstallment } from '../../../models/installment';

type Args = {
  billId: string;
};

const installments = async (_parent: any, args: Args): Promise<IInstallment[]> => {
  const { billId } = args;

  return Installment.find({
    bill: billId,
  }).sort({ isPaid: 1, number: 1 });
};

export default installments;
