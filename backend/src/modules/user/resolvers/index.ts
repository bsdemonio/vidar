import { IResolvers } from 'apollo-server-express';

import login from './login';
import me from './me';
import signup from './signup';

const resolvers: IResolvers = {
  Mutation: {
    login,
    signup,
  },
  Query: {
    me,
  },
};

export default resolvers;
