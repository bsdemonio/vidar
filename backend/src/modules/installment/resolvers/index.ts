import { IResolvers } from 'apollo-server-express';

import installment from './installment';
import installments from './installments';
import installmentsByDateRange from './installments-date-range';
import payInstallment from './pay-installment';

const resolvers: IResolvers = {
  Mutation: {
    payInstallment,
  },
  Query: {
    installment,
    installments,
    installmentsByDateRange,
  },
};

export default resolvers;
