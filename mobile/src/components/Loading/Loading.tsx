import React, {FC} from 'react';

import {View, ActivityIndicator} from 'react-native';

import styles from './Loading.styles';

const ListHeader: FC = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  );
};

export default ListHeader;
