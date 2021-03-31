import React, {FC} from 'react';

import {TextInput, TextInputProps} from 'react-native';

import styles from './Input.styles';

type Props = {
  borderless?: boolean;
} & TextInputProps;

const Input: FC<Props> = ({
  onChangeText,
  placeholder,
  borderless,
  value,
  editable,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.input, borderless ? {} : styles.border]}
      value={value}
      editable={editable}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
    />
  );
};

export default Input;
