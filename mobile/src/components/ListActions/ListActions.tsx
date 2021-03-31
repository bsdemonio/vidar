import React, {FC} from 'react';

import {Text, TouchableOpacity, ListRenderItemInfo, View} from 'react-native';

import {Installment} from '../../types';

import styles from './ListActions.styles';

type Props = {
  data: ListRenderItemInfo<Installment>;
  onDelete: (id: string) => void;
  onPay: (id: string) => void;
};

const ListAction: FC<Props> = ({data, onDelete, onPay}) => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={[styles.backRightBtn, styles.backRightBtnRight]}
      onPress={() => onDelete(data.item.bill.id)}>
      <Text style={styles.backTextWhite}>Delete</Text>
    </TouchableOpacity>
    <TouchableOpacity
      disabled={data.item.isPaid}
      style={[
        styles.backRightBtn,
        styles.backRightBtnLeft,
        data.item.isPaid ? styles.disabled : [],
      ]}
      onPress={() => {
        onPay(data.item.id);
        //map[data.item.id].closeRow();
      }}>
      <Text style={styles.backTextWhite}>
        {data.item.isPaid ? 'Paid' : 'Pay'}
      </Text>
    </TouchableOpacity>
  </View>
);

export default React.memo(ListAction);
