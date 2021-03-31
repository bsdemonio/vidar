import React, {FC} from 'react';

import {Button, Image, Text, View} from 'react-native';

import Images from '../../images';

import styles from './Error.styles';

type Props = {
  action: () => void;
};

const Error: FC<Props> = ({action}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={Images.Error} />
    <Text style={styles.text}>An unexpected error ocurred</Text>
    <Button title="Try Again" onPress={action} />
  </View>
);

export default Error;
