import { IResolvers } from 'apollo-server-express';

import installment from './installment';
import installments from './installments';
import installmentsByDateRange from './installments-date-range';
import payInstallment from './pay-installment';

const resolvers: IResolvers = {
  Query: {
    installment,
    installments,
    installmentsByDateRange,
  },
  Mutation: {
    payInstallment,
  },
};

export default resolvers;
