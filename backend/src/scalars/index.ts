import DateScalar from './date';

export default {
  typeDefs: [DateScalar.typeDef],
  resolvers: {
    ...DateScalar.resolvers,
  },
};
