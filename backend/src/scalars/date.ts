import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import moment from 'moment';

const typeDef = gql`
  scalar Date
`;

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'A Date formatted YYYY/MM/DD',
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return moment(new Date(value)).format('YYYY/MM/DD');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  },
});

export default {
  typeDef,
  resolvers: {
    Date: DateScalar,
  },
};
