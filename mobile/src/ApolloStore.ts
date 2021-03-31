import {ApolloCache} from '@apollo/client';

import {CreateBillMutationData} from './views/CreateBill/CreateBill.compound';
import {
  InstallmentsQueryData,
  DeleteBillMutationData,
} from './views/Home/Home.compound';
import {GET_INSTALLMENTS} from './views/Home/Home.query';
import {PayInstallmentMutationData} from './views/InstallmentDetails/InstallmentDetails.compound';

export const addBillToLocalStore = (
  store: ApolloCache<CreateBillMutationData>,
  data?: CreateBillMutationData | null,
) => {
  try {
    const installmentsStore = store.readQuery<InstallmentsQueryData>({
      query: GET_INSTALLMENTS,
      variables: {
        paid: false,
      },
    });

    if (data) {
      store.writeQuery({
        query: GET_INSTALLMENTS,
        variables: {
          paid: false,
        },
        data: {
          installments: [
            ...(installmentsStore?.installments || []),
            ...data.createBill.installments,
          ],
        },
      });
    }
  } catch (e) {
    console.log(e);
    //https://github.com/apollographql/apollo-feature-requests/issues/1
  }
};

export const deleteBillFromLocalStore = (
  store: ApolloCache<DeleteBillMutationData>,
  data?: DeleteBillMutationData | null,
) => {
  try {
    const installmentsStore = store.readQuery<InstallmentsQueryData>({
      query: GET_INSTALLMENTS,
      variables: {
        paid: false,
      },
    });

    if (data) {
      const updatedInstallments = installmentsStore?.installments.filter(
        (installment) => installment.bill.id !== data.deleteBill.id,
      );
      store.writeQuery({
        query: GET_INSTALLMENTS,
        variables: {
          paid: false,
        },
        data: {
          installments: updatedInstallments,
        },
      });
    }
  } catch (e) {
    console.log(e);
    //https://github.com/apollographql/apollo-feature-requests/issues/1
  }
};

export const updateInstallmentFromLocalStore = (
  store: ApolloCache<PayInstallmentMutationData>,
  data?: PayInstallmentMutationData | null,
) => {
  try {
    const installmentsStore = store.readQuery<InstallmentsQueryData>({
      query: GET_INSTALLMENTS,
      variables: {
        paid: false,
      },
    });

    if (data) {
      let updatedInstallments = [...(installmentsStore?.installments || [])];
      const indexToDelete = updatedInstallments.findIndex(
        (installment) => installment.id === data.payInstallment.id,
      );

      if (indexToDelete > -1) {
        updatedInstallments.splice(indexToDelete, 1);

        store.writeQuery({
          query: GET_INSTALLMENTS,
          variables: {
            paid: false,
          },
          data: {
            installments: updatedInstallments,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    //https://github.com/apollographql/apollo-feature-requests/issues/1
  }
};
