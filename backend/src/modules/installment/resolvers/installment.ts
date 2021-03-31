import Installment from '../../../models/installment';

type Args = {
  id: string;
};

const installment = async (_parent: any, args: Args) => {
  const { id } = args;

  return Installment.findById(id).populate('bill');
};

export default installment;
