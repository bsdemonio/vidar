import React, {FC} from 'react';

import {View, Text} from 'react-native';

import Button from '../../components/Button';
import {Installment} from '../../types';

import styles from './InstallmentDetails.styles';

type Props = {
  loading: boolean;
  installment: Installment;
  onPayBill: (id: string) => void;
};

const InstallmentDetails: FC<Props> = ({loading, installment, onPayBill}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{installment.bill.name}</Text>
      <Text>Amount: {installment.amount}</Text>
      <Text>Due Date: {installment.dueDate}</Text>
      <Text>Bill Total: {installment.bill.total}</Text>
      <Text>Bill Balance: {installment.bill.balance}</Text>
      <Text>
        Installment {installment.number} of{' '}
        {installment.bill.installmentsNumber}
      </Text>
      <Button
        disabled={installment.isPaid || loading}
        onPress={() => onPayBill(installment.id)}
        title={
          installment.isPaid ? 'Paid' : loading ? 'Paying' : 'Pay Installment'
        }
        loading={loading}
      />
    </View>
  );
};

export default InstallmentDetails;
