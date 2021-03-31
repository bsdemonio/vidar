import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    bills: [Bill] @isAuthenticated
  }

  extend type Mutation {
    createBill(
      name: String!
      installments: Int!
      amount: Float!
      recurrenceNumber: Int!
      recurrenceSpan: String!
      date: String!
    ): Bill @isAuthenticated

    deleteBill(id: ID!): Bill @isAuthenticated
  }

  type Bill {
    id: String
    name: String
    installments: [Installment]
    installmentsNumber: Int
    total: Int
    balance: Float
  }
`;

export default typeDefs;
