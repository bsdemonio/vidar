import {gql} from '@apollo/client';

export const PAY_INSTALLMENT = gql`
  mutation PayInstallment($id: ID!) {
    payInstallment(id: $id) {
      id
    }
  }
`;
