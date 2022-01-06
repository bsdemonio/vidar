import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import moment from 'moment';

const typeDef = gql`
  scalar Date
`;

const DateScalar = new GraphQLScalarType({
  description: 'A Date formatted YYYY/MM/DD',
  name: 'Date',
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  },
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return moment(new Date(value)).format('YYYY/MM/DD');
  },
});

export default {
  resolvers: {
    Date: DateScalar,
  },
  typeDef,
};
