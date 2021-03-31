import {gql} from '@apollo/client';

export const GET_INSTALLMENTS = gql`
  query GetInstallments($paid: Boolean!) {
    installments(paid: $paid) {
      id
      number
      isPaid
      dueDate
      amount
      bill {
        id
        name
        installmentsNumber
        total
        balance
      }
    }
  }
`;

export const DELETE_BILL = gql`
  mutation DeleteBill($id: ID!) {
    deleteBill(id: $id) {
      id
    }
  }
`;
