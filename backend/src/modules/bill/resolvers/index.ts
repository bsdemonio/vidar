import { IResolvers } from 'apollo-server-express';

import bills from './bills';
import createBill from './create-bill';
import deleteBill from './delete-bill';

const resolvers: IResolvers = {
  Mutation: {
    createBill,
    deleteBill,
  },
  Query: {
    bills,
  },
};

export default resolvers;
