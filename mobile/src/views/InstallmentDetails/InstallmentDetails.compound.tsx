import React, {FC, useState} from 'react';

import {useMutation} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import {updateInstallmentFromLocalStore} from '../../ApolloStore';
import {Installment, HomeNonModalStackParamList} from '../../types';

import InstallmentDetails from './InstallmentDetails';
import {PAY_INSTALLMENT} from './InstallmentDetails.query';

type InstallmentDetailRouteProp = RouteProp<
  HomeNonModalStackParamList,
  'Details'
>;

type Props = {
  route: InstallmentDetailRouteProp;
};

export type PayInstallmentMutationData = {
  payInstallment: {
    id: string;
  };
};

export type PayInstallmentMutationVars = {
  id: string;
};

const InstallmentDetailsCompound: FC<Props> = ({route}) => {
  const [installment, setInstallment] = useState<Installment>(
    route.params.installment,
  );
  const [payInstallment, {loading}] = useMutation<
    PayInstallmentMutationData,
    PayInstallmentMutationVars
  >(PAY_INSTALLMENT, {
    onCompleted: () => {
      setInstallment((prev) => ({...prev, isPaid: true}));
    },
    onError: (e) => {
      console.error(JSON.stringify(e, null, 4));
      showMessage({
        message:
          'There was an error while paying the installment, please try it again.',
        type: 'danger',
        duration: 5000,
        icon: 'danger',
      });
    },
  });

  const handlePayInstallment = (id: string) => {
    payInstallment({
      variables: {id},
      update: (store, {data}) => {
        updateInstallmentFromLocalStore(store, data);
      },
    });
  };

  return (
    <InstallmentDetails
      loading={loading}
      installment={installment}
      onPayBill={handlePayInstallment}
    />
  );
};

export default InstallmentDetailsCompound;
