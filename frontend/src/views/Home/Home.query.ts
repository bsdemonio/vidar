import gql from 'graphql-tag';

export const GET_INSTALLMENTS = gql`
  query GetInstallments($startDate: String!, $endDate: String!) {
    installments(startDate: $startDate, endDate: $endDate) {
      id
      number
      isPaid
      dueDate
      amount
      bill {
        id
        name
        installmentsNumber
      }
    }
  }
`;
