import DateScalar from './date';

export default {
  resolvers: {
    ...DateScalar.resolvers,
  },
  typeDefs: [DateScalar.typeDef],
};
