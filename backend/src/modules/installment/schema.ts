import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    installment(id: ID!): Installment @isAuthenticated
    installmentsByDateRange(startDate: String!, endDate: String!): [Installment] @isAuthenticated
    installments(paid: Boolean!): [Installment] @isAuthenticated
  }

  extend type Mutation {
    payInstallment(id: ID!): Installment @isAuthenticated
  }

  type Installment {
    id: ID
    number: Int
    dueDate: Date
    amount: Float
    isPaid: Boolean
    bill: Bill
  }
`;

export default typeDefs;
