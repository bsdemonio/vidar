import React, {FC} from 'react';

import {differenceInCalendarDays, format} from 'date-fns';
import {View, Text, TouchableHighlight} from 'react-native';

import colors from '../../constants/colors';
import {Installment} from '../../types';

import styles from './installmentCard.styles';

type Props = {
  installment: Installment;
  onPress: () => void;
};

const ONE_DAY = 24 * 3600 * 1000;
const FIVE_DAYS = ONE_DAY * 5;
const TEN_DAYS = ONE_DAY * 10;

const today = new Date().getTime();

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const getStatusColor = (overdue: number) => {
  if (overdue >= TEN_DAYS) {
    return colors.overdueTenDays;
  }
  if (overdue >= FIVE_DAYS) {
    return colors.overdueFiveDays;
  }
  if (overdue >= ONE_DAY) {
    return colors.overdueOneDay;
  }
  return '';
};

const getDue = (dueDate: string) => {
  const diff = differenceInCalendarDays(new Date(), new Date(dueDate));
  if (diff === 0) {
    return 'Due today';
  }
  if (diff < 0) {
    // TODO handle singular an plural
    return `Due in ${Math.abs(diff)} days`;
  }
  return `Overdue by ${diff} days`;
};

const InstallmentCard: FC<Props> = ({installment, onPress}) => {
  const dueDate = new Date(installment.dueDate).getTime();
  const overdue = today - dueDate;
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View>
            <Text style={styles.name}>{installment.bill.name}</Text>
            <Text style={styles.info}>
              {format(new Date(installment.dueDate), 'EEEE do')},{' '}
              {installment.isPaid ? 'Paid' : getDue(installment.dueDate)}
            </Text>
            <Text style={styles.info}>
              Installment {installment.number} of{' '}
              {installment.bill.installmentsNumber}
            </Text>
            {overdue >= ONE_DAY && (
              <View
                style={[
                  styles.status,
                  {backgroundColor: getStatusColor(overdue)},
                ]}
              />
            )}
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>
            {moneyFormatter.format(installment.amount)}
          </Text>
          {/*installment.isPaid && <Text style={styles.info}>Paid</Text>*/}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(InstallmentCard);
