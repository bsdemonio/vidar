import {gql} from '@apollo/client';

export const CREATE_BILL = gql`
  mutation CreateBill(
    $name: String!
    $amount: Float!
    $installments: Int!
    $recurrenceNumber: Int!
    $recurrenceSpan: String!
    $date: String!
  ) {
    createBill(
      name: $name
      amount: $amount
      installments: $installments
      recurrenceNumber: $recurrenceNumber
      recurrenceSpan: $recurrenceSpan
      date: $date
    ) {
      id
      name
      installments {
        id
        number
        dueDate
        amount
        isPaid
      }
    }
  }
`;
