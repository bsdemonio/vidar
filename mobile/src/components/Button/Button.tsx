import React, {FC} from 'react';

import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';

import styles from './Button.styles';

type Props = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button: FC<Props> = ({title, loading, disabled, onPress, style}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, disabled ? [styles.disabled] : [], style]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.title, disabled ? [styles.disabledTitle] : []]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
