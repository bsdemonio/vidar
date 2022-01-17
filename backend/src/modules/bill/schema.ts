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
      category: String!
      placeToPay: String
    ): Bill @isAuthenticated

    deleteBill(id: ID!): Bill @isAuthenticated
  }

  type Bill {
    id: String
    name: String
    category: String
    initialDate: Date
    finalDate: Date
    nextInstallment: Installment
    installmentsNumber: Int
    installments: [Installment]
    total: Float
    balance: Float
    placeToPay: String
  }
`;

export default typeDefs;
