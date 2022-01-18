import { IResolvers } from 'apollo-server-express';

import installment from './installment';
import installments from './installments';
import installmentsByBillId from './installments-bill-id';
import installmentsByDateRange from './installments-date-range';
import payInstallment from './pay-installment';
import undoPayInstallment from './undo-pay-installment';

const resolvers: IResolvers = {
  Mutation: {
    payInstallment,
    undoPayInstallment,
  },
  Query: {
    installment,
    installments,
    installmentsByBillId,
    installmentsByDateRange,
  },
};

export default resolvers;
