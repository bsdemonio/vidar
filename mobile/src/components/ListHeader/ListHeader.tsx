import React, {FC} from 'react';

import {View, Text} from 'react-native';

import styles from './ListHeader.styles';

type Props = {
  header: string;
};

const ListHeader: FC<Props> = ({header}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{header}</Text>
    </View>
  );
};

export default ListHeader;
