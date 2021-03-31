import { IResolvers } from 'apollo-server-express';

import bills from './bills';
import createBill from './create-bill';
import deleteBill from './delete-bill';

const resolvers: IResolvers = {
  Query: {
    bills,
  },
  Mutation: {
    createBill,
    deleteBill,
  },
};

export default resolvers;
