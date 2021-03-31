import Bill from '../../../models/bill';

type Args = {
  id: string;
};

const deleteBill = async (_parent: any, args: Args) => {
  const { id } = args;

  const bill = await Bill.findById(id);

  if (!bill) throw new Error('The bill does not exist');

  await bill.remove();

  return bill;
};

export default deleteBill;
